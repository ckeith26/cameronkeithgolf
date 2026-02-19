export interface PreloadResult {
  frames: HTMLImageElement[];
  loaded: boolean;
}

export function preloadFrames(
  totalFrames: number,
  getPath: (index: number) => string,
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const frames: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    let loadedCount = 0;

    function checkDone() {
      if (loadedCount === totalFrames) {
        // Replace any failed frames with the nearest successful frame
        const result: HTMLImageElement[] = [];
        for (let i = 0; i < totalFrames; i++) {
          const frame = frames[i];
          if (frame) {
            result.push(frame);
          } else {
            // Find nearest loaded frame as fallback
            const fallback = frames.find((f): f is HTMLImageElement => f !== null);
            if (fallback) result.push(fallback);
          }
        }
        resolve(result);
      }
    }

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.onload = () => {
        frames[i] = img;
        loadedCount++;
        onProgress?.(loadedCount, totalFrames);
        checkDone();
      };
      img.onerror = () => {
        loadedCount++;
        onProgress?.(loadedCount, totalFrames);
        checkDone();
      };
      img.src = getPath(i);
    }
  });
}
