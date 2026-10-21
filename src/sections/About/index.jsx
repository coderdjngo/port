import artistPhoto from "../../assets/img/artist/문경애.jpg";
import { PanelInner, usePanel } from "../../components/common/Panel";
import { Label } from "../../components/common/Typography";
import { WaterCanvas } from "../../components/effects/WaterCanvas";
import { useLanguage } from "../../contexts/LanguageContext";
import { Content, Details, Layout, Name, Photo } from "./styles";

export function About() {
  const { isShown } = usePanel();
  const { language, t } = useLanguage();
  const details = [
    { term: t("about.artist"), value: t("artist.name") },
    { term: t("about.discipline"), value: t("about.visualArts") },
    { term: t("about.memberships"), value: t("artist.memberships") },
    { term: t("about.education"), value: t("artist.education") },
    { term: t("about.formerRole"), value: t("artist.formerRole") },
    { term: t("about.exhibitionCount"), value: t("artist.exhibitionCount") },
    { term: t("about.honors"), value: t("artist.honors") },
  ];

  return (
    <PanelInner>
      <Layout>
        <Photo data-animate>
          <WaterCanvas src={artistPhoto} playing={isShown} intensity={0.8} />
        </Photo>

        <Content data-animate>
          <Label $accent>{t("about.label")}</Label>
          <Name>
            {language === "ko" ? t("artist.name") : <>Moon<br />Kyung Ae</>}
          </Name>
          <p>
            {t("about.descriptionFirst")}
            <br />
            <br />
            {t("about.descriptionSecond")}
          </p>
          <Details>
            {details.map(({ term, value }) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </Details>
        </Content>
      </Layout>
    </PanelInner>
  );
}
