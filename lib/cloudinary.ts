/**
 * Detects a Cloudinary URL and injects optimization transforms.
 * Non-Cloudinary URLs are returned unchanged.
 *
 * Input:  https://res.cloudinary.com/demo/image/upload/sample.jpg
 * Output: https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_1200/sample.jpg
 */
export function cloudinaryUrl(
  src: string,
  {
    width = 1200,
    quality = "auto",
    format = "auto",
  }: { width?: number; quality?: string | number; format?: string } = {}
): string {
  if (!src) return src;

  const isCloudinary =
    src.includes("res.cloudinary.com") || src.includes("cloudinary.com");

  if (!isCloudinary) return src;

  // Already has transforms — don't double-insert
  if (src.includes("/upload/f_") || src.includes("/upload/q_") || src.includes("/upload/w_")) {
    return src;
  }

  const transforms = `f_${format},q_${quality},w_${width}`;
  return src.replace("/upload/", `/upload/${transforms}/`);
}

export function isCloudinaryUrl(src: string): boolean {
  return typeof src === "string" && src.includes("cloudinary.com");
}
