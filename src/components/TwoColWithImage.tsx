import Image from "next/image";

type Props = {
  image: { src: string; alt: string; aspect?: string };
  imagePosition?: "left" | "right";
  children: React.ReactNode;
  /** Override alignment of the two-column grid rows. */
  alignTop?: boolean;
};

export function TwoColWithImage({
  image,
  imagePosition = "right",
  children,
  alignTop,
}: Props) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={1200}
      height={900}
      sizes="(max-width: 900px) 100vw, 50vw"
      style={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: 4,
        aspectRatio: image.aspect || "4/3",
        objectFit: "cover",
        display: "block",
      }}
    />
  );

  return (
    <div className={`two-col${alignTop ? " two-col-top" : ""}`}>
      {imagePosition === "left" ? img : children}
      {imagePosition === "left" ? children : img}
    </div>
  );
}
