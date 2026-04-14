type Props = {
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Big watermark word shown on the right (desktop only). */
  bgWord?: string;
};

export function PageHeader({ kicker, title, description, bgWord }: Props) {
  return (
    <header className="page-header" data-bg={bgWord}>
      <span className="kicker kicker-light">{kicker}</span>
      <h1 className="sh2 sh2-light">{title}</h1>
      {description ? <p className="slead slead-muted">{description}</p> : null}
    </header>
  );
}
