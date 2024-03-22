import Link from "next/link";
import ArrowRightIcon from "../../../public/icons/arrow_right_icon";

export default function SectionHeader({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <section className="section_header">
      <h2>{title}</h2>
      <Link href={href}>
        <div className="section_header__link">
          <div className="section_header__link__text">See All</div>
          <div className="section_header__link__icon">
            <ArrowRightIcon />
          </div>
        </div>
      </Link>
    </section>
  );
}
