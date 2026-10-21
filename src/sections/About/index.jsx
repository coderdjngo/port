import aboutShore from "../../assets/img/about-shore.png";
import { PanelInner, usePanel } from "../../components/common/Panel";
import { Label } from "../../components/common/Typography";
import { WaterCanvas } from "../../components/effects/WaterCanvas";
import { ARTIST } from "../../constants/content";
import { useLanguage } from "../../contexts/LanguageContext";
import { Content, Details, Layout, Name, Photo } from "./styles";

export function About() {
  const { isShown } = usePanel();
  const { language, t } = useLanguage();
  const details = [
    { term: t("about.artist"), value: t("artist.name") },
    { term: t("about.discipline"), value: t("about.visualArts") },
  ];

  return (
    <PanelInner>
      <Layout>
        <Photo data-animate>
          <WaterCanvas src={aboutShore} playing={isShown} intensity={0.8} />
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
