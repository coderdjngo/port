import { Container } from "../../components/common/Container";
import { PanelInner } from "../../components/common/Panel";
import { SectionHead } from "../../components/common/SectionHead";
import { FEATURED_WORKS } from "../../constants/content";
import { useArtworks } from "../../contexts/ArtworkContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Caption, FeatureCard, FeatureImage, Layout, Tag } from "./styles";

export function SelectedWorks() {
  const { language, t } = useLanguage();
  const { openFeaturedArtwork } = useArtworks();

  return (
    <PanelInner>
      <Container>
        <SectionHead
          label={t("works.label")}
          title={t("works.title")}
          description={t("works.description")}
        />

        <Layout>
          {FEATURED_WORKS.map((work) => (
            <FeatureCard
              key={work.id}
              type="button"
              data-animate
              aria-label={`${t("artwork.details")} ${language === "ko" ? work.titleKo : work.title}`}
              onClick={() => openFeaturedArtwork(work)}
            >
              <FeatureImage $size={work.size}>
                <img src={work.image} alt={language === "ko" ? work.alt : work.altEn} />
                <Tag>{t("works.featured")} / {work.id}</Tag>
              </FeatureImage>
              <Caption>
                  <h3>{language === "ko" ? work.titleKo : work.title}</h3>
                  <p>{language === "ko" ? work.metaKo : work.meta}</p>
              </Caption>
            </FeatureCard>
          ))}
        </Layout>
      </Container>
    </PanelInner>
  );
}
