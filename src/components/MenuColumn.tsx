export type MenuGroup = {
  title: string;
  /** Optional anchor id used by the sidebar accordion's "skip to section" links. */
  id?: string;
  items: { name: string; description: string }[];
};

export function MenuColumn({ groups }: { groups: MenuGroup[] }) {
  return (
    <div>
      {groups.map((g, i) => (
        <div key={g.title} id={g.id}>
          <div className={`mct${i > 0 ? " mct-spaced" : ""}`}>{g.title}</div>
          {g.items.map((item) => (
            <div className="mi" key={item.name}>
              <div>
                <div className="mi-name">{item.name}</div>
                <div className="mi-desc">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
