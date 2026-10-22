import { Container } from "../../components/common/Container";
import { PanelInner } from "../../components/common/Panel";
import { SectionHead } from "../../components/common/SectionHead";
import { EXHIBITION_PAGE_SIZE, EXHIBITIONS } from "../../constants/content";
import { useLanguage } from "../../contexts/LanguageContext";
import { Arrow, List, Place, Row, Year } from "./styles";

export function Exhibitions({ page }) {
  const { language, t } = useLanguage();
  const exhibitions = EXHIBITIONS.slice(
    page * EXHIBITION_PAGE_SIZE,
    (page + 1) * EXHIBITION_PAGE_SIZE,
  );

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
          {exhibitions.map(({ year, yearKo, title, titleKo, entries }) => (
            <Row key={`${year}-${titleKo}-${entries[0]}`} data-animate>
              <Year>{language === "ko" ? yearKo ?? year : year}</Year>
              <h3>{language === "ko" ? titleKo : title}</h3>
              <Place>{entries.join(" · ")}</Place>
              <Arrow aria-hidden="true">↗</Arrow>
            </Row>
          ))}
        </List>
      </Container>
    </PanelInner>
  );
}
