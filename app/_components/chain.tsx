type ChainProps = {
  steps: string[];
  /** Index of the step currently being described, if any. */
  activeIndex?: number;
};

export function Chain({ steps, activeIndex }: ChainProps) {
  return (
    <p className="chain">
      {steps.map((step, index) => (
        <span key={step}>
          <span
            className={
              index === activeIndex
                ? "chain__step chain__step--active"
                : "chain__step"
            }
          >
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden="true"> → </span>
          ) : null}
        </span>
      ))}
    </p>
  );
}
