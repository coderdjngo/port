import work01 from "../../assets/img/artist/work-01.png";
import { usePanel } from "../../components/common/Panel";
import { Label } from "../../components/common/Typography";
import { WaterCanvas } from "../../components/effects/WaterCanvas";
import { WavyText } from "../../components/effects/WavyText";
import { ARTIST } from "../../constants/content";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Content,
  Curve,
  GridLines,
  Interaction,
  Kicker,
  Overlay,
  ScrollHint,
  ScrollLine,
  Sub,
  Title,
} from "./styles";

const GRID_COLUMNS = 4;

export function Hero() {
  const { isShown } = usePanel();
  const { language, t } = useLanguage();

  return (
    <>
      <WaterCanvas src={work01} playing={isShown} />
      <Overlay />

      <GridLines aria-hidden="true">
        {Array.from({ length: GRID_COLUMNS }, (_, i) => (
          <span key={i} />
        ))}
      </GridLines>

      <Content>
        <Kicker data-animate>
          {t("hero.kicker")}
        </Kicker>
        <Title data-animate>
          <WavyText text={language === "ko" ? t("artist.name") : ARTIST.name} />
        </Title>
        <Sub data-animate>
          <p>
            {t("hero.description")}
            <br />
            {t("hero.descriptionSecond")}
          </p>
          <span>{t("hero.selected")} / {t("artist.location")}</span>
        </Sub>
      </Content>

      <ScrollHint>
        <ScrollLine />
        <Label>{t("hero.scroll")}</Label>
      </ScrollHint>

      <Interaction aria-hidden="true">{t("hero.interaction")}</Interaction>
      <Curve aria-hidden="true" />
    </>
  );
}
