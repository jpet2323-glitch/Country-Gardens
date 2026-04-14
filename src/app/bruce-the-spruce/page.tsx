import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { toastImages } from "@/lib/images";

export const metadata = {
  title: "Bruce the Spruce — Country Gardens",
  description:
    "Follow Bruce the Spruce, a Norway Spruce seedling growing on the Country Gardens farm in Robbinsville, NJ, as he works toward his dream of becoming a Christmas tree.",
};

/**
 * Field Notes ported verbatim from the live Toast site so the published
 * chronology matches the source. Sorted newest-first. If a new post drops,
 * add it at the top of this array.
 */
const fieldNotes = [
  {
    id: "2026-02-10",
    date: "February 10, 2026",
    title: "Out in the quiet of the field",
    paragraphs: [
      "While Bruce the Spruce naps beneath his snowy blanket, something new is already taking shape.",
      "Here at Country Gardens, we\u2019re planning to give Bruce some friends this Spring. \ud83c\udf32\ud83c\udf32\ud83c\udf32",
      "Trees, like people, tend to thrive in community. When seedlings grow together, they help shelter one another from harsh winds, share space in the soil\u2019s living ecosystem, and create their own tiny forest neighborhood. Bruce won\u2019t just be a lone little spruce anymore\u2014he\u2019ll get to step into a brand-new role: big brother.",
      "That means more tiny trees taking root. More green dreams beginning. More future Christmas traditions quietly getting their start.",
      "We\u2019re also hoping to invite you to be part of this moment. A Spring Seedling Planting Day is in the works, where you can help plant the next generation of trees and learn about stewardship, forestry, and the life cycle of a Christmas tree. Timing will depend on the weather and soil conditions (nature always gets the final say), but we\u2019ll share details as soon as the ground gives us the green light.",
      "Bruce is still sleeping. But spring is already whispering. Stay tuned. \ud83c\udf31\u2728",
    ],
  },
  {
    id: "2026-01-26",
    date: "January 26, 2026",
    title: "Snow Day Update from the Field",
    paragraphs: [
      "Today the snow arrived at Country Gardens. As the flakes began to fall, Bruce the Spruce, our little Christmas tree seedling, stood very still, watching winter settle in around him. Slowly, softly, the snow started to tuck him in. To us it looks like a big storm. To Bruce, it\u2019s bedtime.",
      "Each flake adds another layer of protection, wrapping the ground like a winter quilt. As the snow piles up, Bruce isn\u2019t cold or afraid. He\u2019s hibernating exactly the way little seedlings are meant to. And while the snow falls, Bruce is already dreaming.",
      "He\u2019s dreaming of growing taller each year. Of lights twinkling on his branches. Of ornaments chosen with care. Of becoming part of a family\u2019s Christmas tradition someday.",
      "For now, he rests beneath the snowfall, safe and snug on our Country Gardens field, letting winter do its quiet work.",
      "Sweet dreams, Bruce. We\u2019ll see you when spring wakes you up. \u2728\ud83c\udf32\u2744\ufe0f",
    ],
  },
  {
    id: "2025-11-11",
    date: "November 11, 2025",
    title: "The Little Tree With a Big Dream",
    paragraphs: [
      "Out in a quiet corner of our Christmas tree field lives a tiny Norway Spruce seedling with a very big dream.",
      "Every evening, as the sky turns soft and purple, he stretches his little branches as tall as he can. In the distance, he sees the glow of a grown-up Christmas tree\u2014twinkling with lights, surrounded by families, chosen to be part of someone\u2019s holiday story.",
      "And he thinks: \u201cOne day\u2026 maybe that could be me.\u201d",
      "For now, he\u2019s still small\u2014rooted right here on our family farm, soaking up sunshine, drinking in the rain, and growing a little more each day. Just like every tall tree once did. \ud83c\udf31",
      "And we know our Robbinsville community will watch him grow. \ud83d\udc9a",
    ],
  },
];

export default function BruceTheSprucePage() {
  return (
    <>
      <PageHeader
        kicker="A Country Gardens Original"
        title="Bruce the Spruce"
        description="Follow Bruce, a Norway Spruce seedling growing up on our Robbinsville farm, as he works toward his dream of becoming a Christmas tree."
        bgWord="BRUCE"
      />

      <section className="section section-light">
        {/* ORIGIN STORY */}
        <div style={{ marginBottom: "2.5rem" }}>
          <TwoColWithImage
            imagePosition="right"
            image={{
              src: toastImages.bruceSpruce,
              alt: "Bruce the Spruce — a Norway Spruce seedling at Country Gardens",
              aspect: "1/1",
            }}
          >
            <div>
              <span className="kicker">The Origin Story</span>
              <h3 className="sh3">A tiny seedling with a very big dream.</h3>
              <p className="slead" style={{ maxWidth: "100%", marginBottom: "1rem" }}>
                Bruce the Spruce began as a tiny seedling, rooted in the same
                soil and care that shape everything we do at Country Gardens.
                Through our year-round education programs, we follow Bruce&rsquo;s
                journey as he grows &mdash; learning about forestry, stewardship,
                and the patience it takes to nurture a tree from its earliest
                days.
              </p>
              <p className="slead" style={{ maxWidth: "100%" }}>
                Along the way, Bruce helps us teach how trees are planted,
                tended, and thoughtfully grown, connecting families to the life
                cycle of a Christmas tree. With time, care, and a little magic,
                Bruce hopes to one day fulfill his dream &mdash; becoming a
                Christmas tree in a family&rsquo;s home, or living on in a yard
                where he can be planted and enjoyed for years to come.
              </p>
            </div>
          </TwoColWithImage>
        </div>

        {/* FIELD NOTES FEED */}
        <div id="field-notes">
          <span className="kicker">Notes from the Field</span>
          <h3 className="sh3" style={{ marginBottom: "0.4rem" }}>
            Field Notes
          </h3>
          <p className="slead" style={{ maxWidth: "60ch", marginBottom: "1.5rem" }}>
            Little updates from the Christmas tree field in Robbinsville &mdash;
            how Bruce is growing, what he&rsquo;s dreaming about, and what&rsquo;s
            next on the farm.
          </p>

          <div className="field-notes">
            {fieldNotes.map((note) => (
              <article key={note.id} className="field-note">
                <header className="field-note-header">
                  <time className="field-note-date" dateTime={note.id}>
                    {note.date}
                  </time>
                  <h4 className="field-note-title">{note.title}</h4>
                </header>
                <div className="field-note-body">
                  {note.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
