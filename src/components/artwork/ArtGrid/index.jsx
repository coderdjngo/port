import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ARCHIVE_PAGE_SIZE } from "../../../constants/artworks";
import { useArtworks } from "../../../contexts/ArtworkContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { getArchivePage } from "../../../utils/archive";
import { ArtCard } from "../ArtCard";
import { CARD_SHAPES } from "../ArtCard/styles";
import { Empty, Grid } from "./styles";

export function ArtGrid({ page }) {
  const { artworks, category, openArtwork } = useArtworks();
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const gridRef = useRef(null);
  const items = getArchivePage(artworks, page, ARCHIVE_PAGE_SIZE);

  // 필터 변경 시 카드가 물결처럼 순차적
  useEffect(() => {
    if (reducedMotion || !gridRef.current) return undefined;

    const tween = gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );
    return () => tween.kill();
  }, [category, reducedMotion]);

  if (!items.length) return <Empty>{t("archive.empty")}</Empty>;

  return (
    <Grid ref={gridRef}>
      {items.map(({ work, index }, order) => (
        <ArtCard
          key={work.id}
          work={work}
          shape={CARD_SHAPES[order % CARD_SHAPES.length]}
          onOpen={() => openArtwork(index)}
        />
      ))}
    </Grid>
  );
}
