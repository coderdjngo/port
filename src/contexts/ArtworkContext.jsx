import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ARTWORKS } from "../constants/artworks";
import { FEATURED_WORKS } from "../constants/content";
import { filterArtworks } from "../utils/archive";

const ArtworkContext = createContext(null);

export function ArtworkProvider({ children }) {
  const [category, setCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalArtworks, setModalArtworks] = useState([]);

  const artworks = useMemo(() => filterArtworks(ARTWORKS, category), [category]);
  const isModalOpen = selectedIndex !== null;

  const openArtwork = useCallback(
    (index) => {
      setModalArtworks(artworks);
      setSelectedIndex(index);
    },
    [artworks],
  );
  const openFeaturedArtwork = useCallback((work) => {
    setModalArtworks(FEATURED_WORKS);
    setSelectedIndex(FEATURED_WORKS.indexOf(work));
  }, []);
  const closeArtwork = useCallback(() => setSelectedIndex(null), []);

  const stepArtwork = useCallback(
    (direction) =>
      setSelectedIndex((index) => (index + direction + modalArtworks.length) % modalArtworks.length),
    [modalArtworks.length],
  );

  const value = useMemo(
    () => ({
      // 현재 선택된 필터 값 ("all" | "painting" | "photography" | "mixed")
      category,
      // 필터 변경 함수 — FilterBar 버튼 클릭 시 호출
      setCategory,
      // category로 걸러진 작품 목록 (ArtGrid에서 사용)
      artworks,
      // 현재 모달의 작품 목록 (아카이브 또는 대표 작품)
      modalArtworks,
      // 모달에 띄울 작품 객체, 모달이 닫혀 있으면 null
      selectedArtwork: isModalOpen ? modalArtworks[selectedIndex] : null,
      // 모달에 띄운 작품의 목록 기준 인덱스, 닫혀 있으면 null
      selectedIndex,
      // 모달 열림 여부 (열려 있으면 스크롤 이동 잠금 + 배경 inert)
      isModalOpen,
      // openArtwork(index) — 해당 인덱스 작품으로 모달 열기
      openArtwork,
      // 대표 작품 목록에서 상세 모달 열기
      openFeaturedArtwork,
      // closeArtwork() — 모달 닫기
      closeArtwork,
      // stepArtwork(1 | -1) — 모달에서 다음/이전 작품으로 이동 (끝에서 처음으로 순환)
      stepArtwork,
    }),
    [
      category,
      artworks,
      modalArtworks,
      selectedIndex,
      isModalOpen,
      openArtwork,
      openFeaturedArtwork,
      closeArtwork,
      stepArtwork,
    ],
  );

  return <ArtworkContext.Provider value={value}>{children}</ArtworkContext.Provider>;
}

export function useArtworks() {
  const context = useContext(ArtworkContext);
  if (!context) throw new Error("useArtworks는 ArtworkProvider 안에서만 써야함");
  return context;
}
