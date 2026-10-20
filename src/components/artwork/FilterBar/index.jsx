import { ARTWORK_CATEGORIES } from "../../../constants/artworks";
import { useArtworks } from "../../../contexts/ArtworkContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { FilterButton, Filters } from "./styles";

export function FilterBar() {
  const { category, setCategory } = useArtworks();
  const { t } = useLanguage();

  return (
    <Filters role="group" aria-label={t("archive.filter")}>
      {ARTWORK_CATEGORIES.map(({ value, labelKey }) => (
        <FilterButton
          key={value}
          type="button"
          $active={value === category}
          aria-pressed={value === category}
          onClick={() => setCategory(value)}
        >
          {t(labelKey)}
        </FilterButton>
      ))}
    </Filters>
  );
}
