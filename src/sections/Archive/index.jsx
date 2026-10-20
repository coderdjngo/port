import { ArtGrid } from "../../components/artwork/ArtGrid";
import { FilterBar } from "../../components/artwork/FilterBar";
import { Container } from "../../components/common/Container";
import { PanelInner } from "../../components/common/Panel";
import { SectionHead } from "../../components/common/SectionHead";
import { useArtworks } from "../../contexts/ArtworkContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSectionLink } from "../../hooks/useSectionLink";
import { Bottom, PageLink } from "./styles";

export function Archive({ page, titleKey, descriptionKey, link }) {
  const { artworks } = useArtworks();
  const { t } = useLanguage();
  const linkProps = useSectionLink(link.to);
  const status = (
    <span>
      {t("archive.collection")} / {artworks.length} {t("archive.works")}
    </span>
  );
  const pageLink = <PageLink {...linkProps}>{t(link.textKey)}</PageLink>;
  const isNext = link.direction === "next";

  return (
    <PanelInner>
      <Container>
        <SectionHead
          compact
          label={t("archive.label")}
          title={t(titleKey)}
          description={t(descriptionKey)}
        />
        <FilterBar />
        <ArtGrid page={page} />
        <Bottom>
          {isNext ? status : pageLink}
          {isNext ? pageLink : status}
        </Bottom>
      </Container>
    </PanelInner>
  );
}
