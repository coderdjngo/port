import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import { useWheelNavigation } from "../hooks/useWheelNavigation";
import { playPanelTransition } from "../utils/transitions";

const FullpageContext = createContext(null);

// 주소창 #해시(#about 등)로 시작 화면 인덱스 구하기, 없거나 틀리면 0(첫 화면)
const getIndexFromHash = (ids) => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return Math.max(ids.indexOf(id), 0);
};

/**
 * 풀페이지 섹션 이동을 전부 관리하는 Provider
 * ids: 섹션 id 배열 (순서 = 화면 순서, sections/index.jsx의 SECTION_IDS)
 */
export function FullpageProvider({ ids, children }) {
  const reducedMotion = usePrefersReducedMotion();
  // 지금 보이는 화면 인덱스
  const [current, setCurrent] = useState(() => getIndexFromHash(ids));
  // 전환 중이면 { from, to }, 아니면 null
  const [transition, setTransition] = useState(null);

  // 각 패널 DOM (전환 애니메이션 대상)
  const panelsRef = useRef([]);
  // 이벤트 리스너에서 최신 current 읽기용
  const currentRef = useRef(current);
  // 전환 애니메이션 도는 중인지 (중복 이동 방지)
  const movingRef = useRef(false);
  // 이동 막는 주체들 ("menu", "modal" 등). 하나라도 있으면 잠금
  const locksRef = useRef(new Set());

  const total = ids.length;

  // 지금 이동이 잠겨 있는지
  const isLocked = useCallback(() => locksRef.current.size > 0, []);

  // setLock("modal", true) — key 이름으로 이동 잠금 켜기/끄기
  const setLock = useCallback((key, locked) => {
    if (locked) locksRef.current.add(key);
    else locksRef.current.delete(key);
  }, []);

  // Panel이 자기 DOM을 등록할 때 호출
  const registerPanel = useCallback((index, element) => {
    panelsRef.current[index] = element;
  }, []);

  // goTo(3) — 해당 인덱스 화면으로 이동. 범위 밖 / 같은 화면 / 전환 중 / 잠금 상태면 무시
  const goTo = useCallback(
    (target) => {
      const isValid = Number.isInteger(target) && target >= 0 && target < total;
      if (!isValid || target === currentRef.current || movingRef.current || isLocked()) return;

      movingRef.current = true;
      setTransition({ from: currentRef.current, to: target });
    },
    [total, isLocked],
  );

  // goToId("about") — 섹션 id로 이동
  const goToId = useCallback((id) => goTo(ids.indexOf(id)), [goTo, ids]);
  // step(1 | -1) — 다음/이전 화면으로 이동 (휠·스와이프·키보드가 사용)
  const step = useCallback((direction) => goTo(currentRef.current + direction), [goTo]);

  // 전환 실행: 다음 패널이 화면에 보이도록 렌더된 직후 애니메이션 시작
  useLayoutEffect(() => {
    if (!transition) return undefined;

    const { from, to } = transition;
    const finish = () => {
      currentRef.current = to;
      movingRef.current = false;
      setCurrent(to);
      setTransition(null);
    };

    if (reducedMotion) {
      finish();
      return undefined;
    }

    const timeline = playPanelTransition({
      from: panelsRef.current[from],
      to: panelsRef.current[to],
      direction: to > from ? 1 : -1,
      onComplete: finish,
    });

    return () => timeline.kill();
  }, [transition]);

  // 화면 바뀌면 주소창 #해시도 맞춰서 변경 (새로고침해도 같은 화면 유지)
  useEffect(() => {
    window.history.replaceState(null, "", `#${ids[current]}`);
  }, [current, ids]);

  // 주소창 해시를 직접 바꾸면 그 화면으로 이동
  useEffect(() => {
    const handleHashChange = () => {
      const index = ids.indexOf(decodeURIComponent(window.location.hash.slice(1)));
      if (index >= 0) goTo(index);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [goTo, ids]);

  // 입력별 이동 연결 (휠 / 모바일 스와이프 / 키보드)
  useWheelNavigation({ onStep: step, isLocked });
  useSwipeNavigation({ onStep: step, isLocked });
  useKeyboardNavigation({
    onStep: step,
    onFirst: () => goTo(0),
    onLast: () => goTo(total - 1),
    isLocked,
  });

  // getPanelState(index) — 패널 상태
  // isActive: 지금 보이는 화면 / isEntering: 전환으로 들어오는 중 / isLeaving: 전환으로 나가는 중
  const getPanelState = useCallback(
    (index) => ({
      isActive: index === current,
      isEntering: index === transition?.to,
      isLeaving: index === transition?.from,
    }),
    [current, transition],
  );

  const value = useMemo(
    () => ({
      // 지금 화면 인덱스 (PageIndicator 점·번호가 사용)
      current,
      // 지금 화면 id (Header 메뉴 활성 표시가 사용)
      currentId: ids[current],
      // 전체 화면 수
      total,
      // 섹션 id 배열
      ids,
      // 인덱스로 이동
      goTo,
      // id로 이동 (메뉴·링크가 사용)
      goToId,
      // 다음/이전 이동
      step,
      // 이동 잠금 켜기/끄기 (보통은 아래 useNavigationLock 훅으로 씀)
      setLock,
      // 패널 DOM 등록 (Panel 전용)
      registerPanel,
      // 패널 상태 조회 (Panel 전용)
      getPanelState,
    }),
    [current, ids, total, goTo, goToId, step, setLock, registerPanel, getPanelState],
  );

  return <FullpageContext.Provider value={value}>{children}</FullpageContext.Provider>;
}

// 컴포넌트에서 위 value 꺼내 쓰는 훅
export function useFullpage() {
  const context = useContext(FullpageContext);
  if (!context) throw new Error("useFullpage는 FullpageProvider 안에서만 써야함");
  return context;
}

/**
 * useNavigationLock("modal", isModalOpen)
 * locked가 true인 동안 휠·스와이프·키보드 섹션 이동을 막음 (모달, 모바일 메뉴에서 사용)
 * 컴포넌트가 사라지면 자동으로 잠금 해제
 */
export function useNavigationLock(key, locked) {
  const { setLock } = useFullpage();

  useEffect(() => {
    setLock(key, locked);
    return () => setLock(key, false);
  }, [key, locked, setLock]);
}
