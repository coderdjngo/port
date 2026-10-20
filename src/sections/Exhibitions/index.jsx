import { Container } from "../../components/common/Container";
import { PanelInner } from "../../components/common/Panel";
import { SectionHead } from "../../components/common/SectionHead";
import { EXHIBITIONS } from "../../constants/content";
import { useLanguage } from "../../contexts/LanguageContext";
import { Arrow, List, Place, Row, Year } from "./styles";

export function Exhibitions() {
  const { language, t } = useLanguage();

  return (
    <PanelInner>
      <Container>
        <SectionHead
          label={t("exhibitions.label")}
          title={
            <>
              {t("exhibitions.title")}
              <br />
              {t("exhibitions.titleSecond")}
            </>
          }
          description={t("exhibitions.description")}
        />

        <List>
          {EXHIBITIONS.map(({ year, title, titleKo, place, placeKo }) => (
            <Row key={title} data-animate>
              <Year>{year}</Year>
              <h3>{language === "ko" ? titleKo : title}</h3>
              <Place>{language === "ko" ? placeKo : place}</Place>
              <Arrow aria-hidden="true">↗</Arrow>
            </Row>
          ))}
        </List>
      </Container>
    </PanelInner>
  );
}
