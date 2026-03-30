export type PinDirection = 'next' | 'previous';

export function getWrappedPinIndex(
  currentIndex: number,
  totalPins: number,
  direction: PinDirection
): number {
  if (totalPins <= 0) {
    return -1;
  }

  if (currentIndex < 0 || currentIndex >= totalPins) {
    return direction === 'next' ? 0 : totalPins - 1;
  }

  if (direction === 'next') {
    return (currentIndex + 1) % totalPins;
  }

  return (currentIndex - 1 + totalPins) % totalPins;
}
