import Link from "next/link";
import type { ReactNode } from "react";

type TextCtaProps = {
  href: string;
  children: ReactNode;
  /** Force a full page load — used when crossing into an isolated runtime. */
  hard?: boolean;
};

export function TextCta({ href, children, hard = false }: TextCtaProps) {
  const content = (
    <>
      {children} <span className="text-cta__arrow" aria-hidden="true">→</span>
    </>
  );

  if (hard) {
    return (
      <a className="text-cta" href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className="text-cta" href={href}>
      {content}
    </Link>
  );
}
