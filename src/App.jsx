import { ThemeProvider } from "styled-components";
import { ArtworkModal } from "./components/artwork/ArtworkModal";
import { Panel } from "./components/common/Panel";
import { ClickRipple } from "./components/effects/ClickRipple";
import { WaterFilter } from "./components/effects/WaterFilter";
import { Header } from "./components/layout/Header";
import { PageIndicator } from "./components/layout/PageIndicator";
import { ArtworkProvider, useArtworks } from "./contexts/ArtworkContext";
import { FullpageProvider } from "./contexts/FullpageContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { SECTION_IDS, SECTIONS } from "./sections";
import { GlobalStyle } from "./styles/GlobalStyle";
import { FullpageMain } from "./styles/layout";
import { theme } from "./styles/theme";

function Portfolio() {
  // 모달이 열려 있는 동안 배경 영역은 포커스/조작 불가
  const { isModalOpen } = useArtworks();
  const { t } = useLanguage();

  return (
    <>
      <Header inert={isModalOpen} />
      <PageIndicator sections={SECTIONS} inert={isModalOpen} />

      <FullpageMain inert={isModalOpen}>
        {SECTIONS.map(({ id, labelKey, tone, background, Component, props }, index) => (
          <Panel
            key={id}
            index={index}
            id={id}
            label={t(labelKey)}
            tone={tone}
            background={background}
          >
            <Component {...props} />
          </Panel>
        ))}
      </FullpageMain>

      <ArtworkModal />
      <ClickRipple />
      <WaterFilter />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LanguageProvider>
        <FullpageProvider ids={SECTION_IDS}>
          <ArtworkProvider>
            <Portfolio />
          </ArtworkProvider>
        </FullpageProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
