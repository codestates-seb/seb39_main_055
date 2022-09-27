/* eslint-disable no-restricted-globals */
import { extractImageInfos } from "./imageProcessor";

const MAX_WIDTH = 1000;

self.addEventListener("message", async ({ data }) => {
  const { images, canvas } = data;
  const ctx = canvas.getContext("2d");

  const compressed = await Promise.all(
    images.map(async (img: File) => {
      // 압축 미지원 포맷 - SVG, GIF
      if (images.length > 0) {
        const image = await createImageBitmap(img);
        const { width, height } = image;
        const ratio = height / width;

        const W = width > MAX_WIDTH ? MAX_WIDTH : width;
        const H = W * ratio;

        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(image, 0, 0, W, H);
        return canvas.convertToBlob({ quality: 0.8 });
      }
      return img;
    })
  );

  const processed = await extractImageInfos(compressed);

  self.postMessage(processed);
});
