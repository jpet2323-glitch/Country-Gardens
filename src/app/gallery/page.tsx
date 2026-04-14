import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Gallery — Photos from the Farm" };

const photos = [
  {
    src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80&fit=crop&h=1200",
    alt: "Country Gardens",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80&fit=crop",
    alt: "Deli counter",
  },
  {
    src: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80&fit=crop",
    alt: "Fresh baked pies",
  },
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop",
    alt: "Garden center",
  },
  {
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80&fit=crop",
    alt: "Fresh pastries",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        kicker="A Look Inside"
        title="Photos from the Farm"
        description="From our deli counter to the garden lot — a peek at what makes Country Gardens special."
        bgWord="GALLERY"
      />
      <section id="photos" className="section section-light">
        <div className="gg">
          {photos.map((p) => (
            <div key={p.src} className={`gi${p.tall ? " tall" : ""}`}>
              <Image
                src={p.src}
                alt={p.alt}
                width={800}
                height={p.tall ? 1200 : 600}
                sizes="(max-width: 900px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <p className="note-italic">
          Replace image URLs with your own photos once the site is hosted.
        </p>
      </section>
    </>
  );
}
