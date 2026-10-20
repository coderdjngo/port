import { useSectionLink } from "../../../hooks/useSectionLink";
import { StyledArrowLink } from "./styles";

export function ArrowLink({ to, children }) {
  const linkProps = useSectionLink(to);

  return (
    <StyledArrowLink {...linkProps}>
      {children} <span aria-hidden="true">↗</span>
    </StyledArrowLink>
  );
}
