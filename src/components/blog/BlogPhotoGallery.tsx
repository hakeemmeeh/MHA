import Image from "next/image";
import type { BlogGalleryImage } from "@/types";

type Props = {
  images: BlogGalleryImage[];
};

export function BlogPhotoGallery({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <div className="mt-12 space-y-12 border-t border-border pt-12">
      <h2 className="font-playfair text-2xl font-bold text-navy">Field photos</h2>
      <ul className="space-y-14">
        {images.map((item, index) => (
          <li key={item.src}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy/5 shadow-md sm:aspect-[16/10]">
                <Image
                  src={item.src}
                  alt={item.alt ?? item.caption.slice(0, 120)}
                  fill
                  className="object-cover photo-brighten photo-focal"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={90}
                />
              </div>
              <figcaption className="mt-4 font-inter text-sm leading-relaxed text-text-mid">
                <span className="font-semibold text-navy">Photo {index + 1}. </span>
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
