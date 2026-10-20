import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useArtworks } from "../../../contexts/ArtworkContext";
import { useNavigationLock } from "../../../contexts/FullpageContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import {
  Body,
  Category,
  CloseButton,
  Controls,
  Counter,
  Description,
  Dialog,
  Meta,
  Overlay,
  Photo,
  StepButton,
  Title,
} from "./styles";

/** 작품 카드 눌렀을 때 뜨는 상세 팝업 (App 루트에 한 번만 렌더) */
export function ArtworkModal() {
  const { language, t } = useLanguage();
  const {
    // 현재 작품 목록 — 하단 카운터와 이전/다음 탐색에 사용
    modalArtworks,
    // 지금 띄울 작품 객체 (이 파일에선 work로 이름 바꿔서 씀), 닫혀 있으면 null
    selectedArtwork: work,
    // 지금 작품이 artworks에서 몇 번째인지 — "1 / 6" 의 앞 숫자, 이미지 전환 애니메이션 트리거
    selectedIndex,
    // 모달 열림 여부 — 아래 effect들 켜고 끄는 기준
    isModalOpen,
    // 모달 닫기 (× 버튼, 바깥 클릭, ESC)
    closeArtwork,
    // 이전/다음 작품 (← → 버튼, 키보드 방향키)
    stepArtwork,
  } = useArtworks();
  const reducedMotion = usePrefersReducedMotion();
  // 팝업 박스 (등장 애니메이션 + 포커스 가두는 범위)
  const dialogRef = useRef(null);
  // 열리자마자 포커스 줄 × 버튼
  const closeButtonRef = useRef(null);
  // 작품 넘길 때 애니메이션 줄 이미지
  const imageRef = useRef(null);

  // 모달 떠 있는 동안 휠·스와이프·키보드 섹션 이동 막기
  useNavigationLock("modal", isModalOpen);
  // Tab 눌러도 포커스가 모달 밖으로 안 나가게
  useFocusTrap([dialogRef], isModalOpen);

  // 열릴 때 × 버튼에 포커스, 닫히면 원래 누른 카드로 포커스 돌려주기
  useEffect(() => {
    if (!isModalOpen) return undefined;

    const returnFocus = document.activeElement;
    closeButtonRef.current?.focus();
    return () => returnFocus?.focus?.();
  }, [isModalOpen]);

  // 키보드: ESC 닫기 / ← 이전 / → 다음
  useEffect(() => {
    if (!isModalOpen) return undefined;

    const keyActions = {
      Escape: closeArtwork,
      ArrowLeft: () => stepArtwork(-1),
      ArrowRight: () => stepArtwork(1),
    };

    const handleKeyDown = (event) => keyActions[event.key]?.();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeArtwork, stepArtwork]);

  // 열릴 때 팝업이 살짝 아래에서 떠오르는 애니메이션
  useEffect(() => {
    if (!isModalOpen || reducedMotion) return;

    gsap.fromTo(
      dialogRef.current,
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [isModalOpen, reducedMotion]);

  // 작품 넘길 때마다(selectedIndex 바뀔 때) 이미지 페이드 + 살짝 줌아웃
  useEffect(() => {
    if (!isModalOpen || reducedMotion) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0.55, scale: 1.035 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
    );
  }, [selectedIndex, isModalOpen, reducedMotion]);

  // 선택된 작품 없으면(닫힌 상태) 아무것도 안 그림
  if (!work) return null;

  // 팝업 바깥 어두운 배경 눌렀을 때만 닫기 (팝업 안쪽 클릭은 무시)
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) closeArtwork();
  };
  const title = language === "ko" ? work.titleKo : work.title;
  const category = language === "ko" ? work.categoryKo : work.category;
  const medium = language === "ko" ? work.mediumKo : work.medium;
  const description = language === "ko" ? work.descriptionKo : work.description;

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="artwork-title">
        <CloseButton
          ref={closeButtonRef}
          type="button"
          aria-label={t("artwork.close")}
          onClick={closeArtwork}
        >
          ×
        </CloseButton>

        <Photo>
          <img ref={imageRef} src={work.image} alt={title} />
        </Photo>

        <Body>
          <Category>{category}</Category>
          <Title id="artwork-title">{title}</Title>
          <Description>{description}</Description>

          <Meta>
            <p>{t("artwork.year")} / {work.year}</p>
            <p>{t("artwork.medium")} / {medium}</p>
          </Meta>

          <Controls>
            <StepButton
              type="button"
              aria-label={t("artwork.previous")}
              onClick={() => stepArtwork(-1)}
            >
              ←
            </StepButton>
            <Counter>
              {selectedIndex + 1} / {modalArtworks.length}
            </Counter>
            <StepButton
              type="button"
              aria-label={t("artwork.next")}
              onClick={() => stepArtwork(1)}
            >
              →
            </StepButton>
          </Controls>
        </Body>
      </Dialog>
    </Overlay>
  );
}
