import { useFullpage } from "../../../contexts/FullpageContext";
import { formatPageCount } from "../../../utils/format";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Count, Dot, DotList, DownButton } from "./styles";

/** 우측 페이지 점, 하단 페이지 번호, 다음 화면 버튼 (현재 섹션 톤에 맞춰 색 전환) */
export function PageIndicator({ sections, inert }) {
  const { current, total, goTo } = useFullpage();
  const { t } = useLanguage();
  const isLast = current === total - 1;
  const isLight = sections[current].tone === "light";

  return (
    <div inert={inert}>
      <DotList aria-label={t("page.navigation")} $light={isLight}>
        {sections.map(({ id, labelKey }, index) => (
          <Dot
            key={id}
            type="button"
            $active={index === current}
            aria-label={`${t("page.label")} ${index + 1}: ${t(labelKey)}`}
            aria-current={index === current ? "step" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </DotList>

      <Count aria-live="polite" $light={isLight}>
        {formatPageCount(current, total)}
      </Count>

      <DownButton
        type="button"
        $light={isLight}
        aria-label={t(isLast ? "page.first" : "page.next")}
        onClick={() => goTo(isLast ? 0 : current + 1)}
      >
        {isLast ? "↑" : "↓"}
      </DownButton>
    </div>
  );
}
