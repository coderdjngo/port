import underwater from "../../assets/img/visual-underwater.png";
import { usePanel } from "../../components/common/Panel";
import { Accent, Label } from "../../components/common/Typography";
import { WaterCanvas } from "../../components/effects/WaterCanvas";
import { useLanguage } from "../../contexts/LanguageContext";
import { Content, Overlay, Title } from "./styles";


export function Visual() {
  const { isShown } = usePanel();
  const { t } = useLanguage();

  return (
    <>
      <WaterCanvas src={underwater} playing={isShown} intensity={1.35} />
      <Overlay />
      <Content>
        <Label data-animate>{t("visual.label")}</Label>
        <Title data-animate>
          {t("visual.title")}
          <br />
          <Accent>{t("visual.titleAccent")}</Accent>
        </Title>
        <Label data-animate>{t("visual.caption")}</Label>
      </Content>
    </>
  );
}
