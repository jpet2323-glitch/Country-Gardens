import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export function OfferingCard({ href, title, description, image, alt }: Props) {
  return (
    <Link href={href} className="oc">
      <Image
        src={image}
        alt={alt}
        width={800}
        height={300}
        sizes="(max-width: 900px) 50vw, 300px"
        style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}
      />
      <div className="oc-body">
        <div className="oc-title">{title}</div>
        <p className="oc-desc">{description}</p>
      </div>
    </Link>
  );
}
