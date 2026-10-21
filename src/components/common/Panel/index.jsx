import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useFullpage } from "../../../contexts/FullpageContext";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { tones } from "../../../styles/theme";
import { CONTENT_ENTER_DELAY, playContentEnter } from "../../../utils/transitions";
import { PanelSection } from "./styles";

const PanelContext = createContext({ isActive: false, isShown: false });

export function Panel({ index, id, label, tone = "dark", background, children }) {
  const { registerPanel, getPanelState } = useFullpage();
  const { isActive, isEntering, isLeaving } = getPanelState(index);
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  const isShown = isActive || isEntering;

  const setRef = useCallback(
    (element) => {
      sectionRef.current = element;
      registerPanel(index, element);
    },
    [index, registerPanel],
  );

  useEffect(() => {
    if (!isShown || reducedMotion) return undefined;

    const tween = playContentEnter(sectionRef.current.querySelectorAll("[data-animate]"), {
      delay: isEntering ? CONTENT_ENTER_DELAY : 0,
    });
    return () => tween?.kill();
  }, [isShown, reducedMotion]);

  const panelState = useMemo(() => ({ isActive, isShown }), [isActive, isShown]);
  const toneTheme = useCallback((theme) => ({ ...theme, tone: tones[tone] }), [tone]);

  return (
    <ThemeProvider theme={toneTheme}>
      <PanelContext.Provider value={panelState}>
        <PanelSection
          ref={setRef}
          id={id}
          aria-label={label}
          aria-hidden={!isActive}
          inert={!isActive}
          $tone={tone}
          $background={background}
          $visible={isActive || isEntering || isLeaving}
          $layer={isEntering ? 3 : isActive ? 2 : 1}
        >
          {children}
        </PanelSection>
      </PanelContext.Provider>
    </ThemeProvider>
  );
}

export const usePanel = () => useContext(PanelContext);
export { PanelInner } from "./styles";
