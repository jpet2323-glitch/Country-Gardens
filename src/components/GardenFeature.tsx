type Feature = {
  code: string;
  title: string;
  description: string;
  /** Optional anchor id used by the sidebar skip-to-section links. */
  id?: string;
};

export function GardenFeatureList({ features }: { features: Feature[] }) {
  return (
    <div className="gfs">
      {features.map((f) => (
        <div className="gf" id={f.id} key={f.code + f.title}>
          <div className="gfi">{f.code}</div>
          <div>
            <div className="gft">{f.title}</div>
            <div className="gfd">{f.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
