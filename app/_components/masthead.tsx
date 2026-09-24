import Link from "next/link";

type MastheadProps = {
  variant?: "index" | "experiment";
};

export function Masthead({ variant = "index" }: MastheadProps) {
  if (variant === "experiment") {
    return (
      <header className="masthead">
        <Link className="masthead__link" href="/">
          <span aria-hidden="true">←</span> The Robot and Me
        </Link>
      </header>
    );
  }

  return (
    <header className="masthead">
      <Link className="masthead__wordmark" href="/">
        The Robot and Me
      </Link>
      <a className="masthead__link" href="#about">
        About
      </a>
    </header>
  );
}
