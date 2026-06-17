import { cloudinaryUrl } from "@/lib/cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Drop-in <img> replacement. Cloudinary URLs get auto-optimization transforms
 * (f_auto, q_auto, responsive width) injected automatically.
 * Local paths and non-Cloudinary URLs are passed through unchanged.
 */
const CloudinaryImage = ({ src, alt, width = 1200, className, style }: CloudinaryImageProps) => {
  const resolvedSrc = src?.startsWith("http")
    ? cloudinaryUrl(src, { width })
    : src; // local paths served from Next.js /public

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
    />
  );
};

export default CloudinaryImage;
