import { ArtGrid } from "../../components/artwork/ArtGrid";
import { Container } from "../../components/common/Container";
import { PanelInner } from "../../components/common/Panel";
import { SectionHead } from "../../components/common/SectionHead";
import { ARCHIVE_PAGE_SIZE } from "../../constants/artworks";
import { useArtworks } from "../../contexts/ArtworkContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSectionLink } from "../../hooks/useSectionLink";
import { Bottom, PageLink } from "./styles";

export function Archive({ page, pageCount }) {
  const { artworks } = useArtworks();
  const { t } = useLanguage();
  const previousLink = useSectionLink(`archive${page}`);
  const nextLink = useSectionLink(`archive${page + 2}`);
  const status = (
    <span>
      {t("archive.collection")} / {artworks.length} {t("archive.works")}
    </span>
  );

  return (
    <PanelInner>
      <Container>
        <SectionHead
          compact
          label={t("archive.label")}
          title={t("archive.title")}
          description={t("archive.description")}
        />
        <ArtGrid page={page} />
        <Bottom>
          {page > 0 ? (
            <PageLink {...previousLink}>{t("archive.previous")}</PageLink>
          ) : (
            <span />
          )}
          {status}
          {page < pageCount - 1 ? (
            <PageLink {...nextLink}>{t("archive.next")}</PageLink>
          ) : (
            <span />
          )}
        </Bottom>
      </Container>
    </PanelInner>
  );
}
