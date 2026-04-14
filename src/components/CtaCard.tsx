type Props = {
  title: string;
  description?: string;
  dark?: boolean;
  children: React.ReactNode;
};

/** Inline call-to-action panel ("Ready to transform your outdoor space?", etc.) */
export function CtaCard({ title, description, dark, children }: Props) {
  return (
    <div className={`cta-card${dark ? " cta-card-dark" : ""}`}>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      <div className="btn-row">{children}</div>
    </div>
  );
}
