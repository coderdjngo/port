import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, isNavItemActive } from "../../../constants/navigation";
import { useFullpage, useNavigationLock } from "../../../contexts/FullpageContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { useSectionLink } from "../../../hooks/useSectionLink";
import { MENU_TRANSITION_MS, MobileNav } from "../MobileNav";
import {
  Bar,
  Gnb,
  GnbLink,
  LanguageButton,
  Logo,
  LogoMark,
  MenuButton,
} from "./styles";

function NavLink({ item, active, t }) {
  const linkProps = useSectionLink(item.target);

  return (
    <GnbLink {...linkProps} $active={active} aria-current={active ? "page" : undefined}>
      {t(item.labelKey)}
    </GnbLink>
  );
}

export function Header({ inert }) {
  const { currentId, goToId } = useFullpage();
  const { language, t, toggleLanguage } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingTargetRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileNavRef = useRef(null);
  const logoLinkProps = useSectionLink("home");

  useNavigationLock("menu", menuOpen);
  useFocusTrap([menuButtonRef, mobileNavRef], menuOpen);

  // 메뉴가 완전히 닫힌 뒤 선택한 섹션으로 이동 (잠금 해제 이후 실행되도록 lock 훅 다음에 선언)
  useEffect(() => {
    const target = pendingTargetRef.current;
    if (menuOpen || !target) return undefined;

    pendingTargetRef.current = null;
    const timer = setTimeout(() => goToId(target), reducedMotion ? 0 : MENU_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [menuOpen, goToId, reducedMotion]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleMobileNavigate = (target) => {
    pendingTargetRef.current = target;
    setMenuOpen(false);
  };

  return (
    <>
      <Bar inert={inert}>
        <Logo {...logoLinkProps}>
          <LogoMark aria-hidden="true">✳</LogoMark>
          <span>{t("artist.name").toUpperCase()}</span>
        </Logo>

        <Gnb aria-label={t("nav.main")}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.target}
              item={item}
              active={isNavItemActive(item, currentId)}
              t={t}
            />
          ))}
        </Gnb>

        <LanguageButton
          type="button"
          aria-label={t(language === "en" ? "language.switchToKo" : "language.switchToEn")}
          onClick={toggleLanguage}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {language === "en" ? "한국어" : "EN"}
        </LanguageButton>

        <MenuButton
          ref={menuButtonRef}
          type="button"
          $open={menuOpen}
          aria-label={t(menuOpen ? "nav.close" : "nav.open")}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </MenuButton>
      </Bar>

      <MobileNav
        ref={mobileNavRef}
        id="mobile-nav"
        open={menuOpen}
        onNavigate={handleMobileNavigate}
      />
    </>
  );
}
