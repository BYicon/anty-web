export function canvasToBlob(
  canvas: Pick<HTMLCanvasElement, "toBlob">,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else
        reject(
          new Error("Could not generate the NFT image. Please try again."),
        );
    }, "image/png");
  });
}

export function validateImageUrl(value: unknown): string {
  if (typeof value !== "string" || value.length > 2048)
    throw new Error("The upload service returned an invalid image URL.");
  const url = new URL(value);
  if (
    !["https:", "ipfs:"].includes(url.protocol) ||
    !url.hostname ||
    url.username ||
    url.password
  )
    throw new Error("The upload service returned an unsafe image URL.");
  return url.href;
}

export function nftImageSource(value: string): string {
  try {
    const url = validateImageUrl(value);
    return url.startsWith("ipfs://")
      ? "https://ipfs.io/ipfs/" + url.slice(7)
      : url;
  } catch {
    return "/images/logo.png";
  }
}
