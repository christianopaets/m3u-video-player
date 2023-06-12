export function checkUrl(url: string): boolean {
  if (!url) {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
