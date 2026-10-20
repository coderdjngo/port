import { useEffect } from "react";
import { NAV_ITEMS } from "../../../constants/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useSectionLink } from "../../../hooks/useSectionLink";
import { FlowingWaves } from "../../effects/FlowingWaves";
import { Drawer, DrawerLink } from "./styles";

export const MENU_TRANSITION_MS = 550;

function MobileNavLink({ item, order, open, onNavigate, t }) {
  const linkProps = useSectionLink(item.target, { onNavigate });

  return (
    <DrawerLink {...linkProps} $order={order} $open={open}>
      {t(item.mobileLabelKey)}
    </DrawerLink>
  );
}

export function MobileNav({ ref, id, open, onNavigate }) {
  const { t } = useLanguage();
  useEffect(() => {
    if (open) ref.current?.querySelector("a")?.focus();
  }, [open, ref]);

  return (
    <Drawer
      ref={ref}
      id={id}
      aria-label={t("nav.mobile")}
      inert={!open}
      $open={open}
      $duration={MENU_TRANSITION_MS}
    >
      {NAV_ITEMS.map((item, index) => (
        <MobileNavLink
          key={item.target}
          item={item}
          order={index}
          open={open}
          onNavigate={onNavigate}
          t={t}
        />
      ))}
      <FlowingWaves height={140} />
    </Drawer>
  );
}
