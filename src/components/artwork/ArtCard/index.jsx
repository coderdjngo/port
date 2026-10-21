import { Card, CardImage, Info, Medium, MoreIcon, Title, Year } from "./styles";
import { useLanguage } from "../../../contexts/LanguageContext";

export function ArtCard({ work, shape, onOpen }) {
  const { language, t } = useLanguage();
  const title = language === "ko" ? work.titleKo : work.title;
  const medium = language === "ko" ? work.mediumKo : work.medium;

  return (
    <Card type="button" aria-label={`${t("artwork.details")} ${title}`} onClick={onOpen}>
      <CardImage $shape={shape}>
        <img src={work.image} alt={title} loading="lazy" />
        <MoreIcon aria-hidden="true">↗</MoreIcon>
      </CardImage>
      <Info>
        <div>
          <Title>{title}</Title>
          <Medium>{medium}</Medium>
        </div>
        <Year>{work.year}</Year>
      </Info>
    </Card>
  );
}
