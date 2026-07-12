export function isRTL(text: string): boolean {
  return /[؀-ۿ]/.test(text);
}
