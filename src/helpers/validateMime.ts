export function validateMime(mime: string) {
  const allowed = [
    "image/png",
    "image/jpeg",
    "application/pdf"
  ];

  return allowed.includes(mime);
}