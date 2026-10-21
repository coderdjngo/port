import { Container } from "../../components/common/Container";
import { PanelInner } from "../../components/common/Panel";
import { Label } from "../../components/common/Typography";
import { FlowingWaves } from "../../components/effects/FlowingWaves";
import { ARTIST } from "../../constants/content";
import { useLanguage } from "../../contexts/LanguageContext";
import { Bottom, Footer, SocialLink, SocialLinks, Title } from "./styles";

export function Contact() {
  const { t } = useLanguage();

  return (
    <PanelInner>
      <Container>
        <Label $accent data-animate>
          {t("contact.label")}
        </Label>
        <Title data-animate>{t("contact.title")}</Title>

        <Bottom data-animate>
          <p>{t("contact.description")}</p>
          <SocialLinks>
            {ARTIST.socials.map(({ name, href }) => (
              <SocialLink key={name} href={href} target="_blank" rel="noreferrer">
                {name} ↗
              </SocialLink>
            ))}
          </SocialLinks>
        </Bottom>
      </Container>

      <FlowingWaves height={160} />
      <Footer>
        © {ARTIST.year} {t("artist.name").toUpperCase()}. {t("contact.rights")}
      </Footer>
    </PanelInner>
  );
}
