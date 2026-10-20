import { SectionTitle } from "../Typography";
import { Description, Head, HeadLabel } from "./styles";

export function SectionHead({ label, title, description, compact = false }) {
  return (
    <Head data-animate $compact={compact}>
      <div>
        <HeadLabel $accent>{label}</HeadLabel>
        <SectionTitle>{title}</SectionTitle>
      </div>
      {description && <Description>{description}</Description>}
    </Head>
  );
}
