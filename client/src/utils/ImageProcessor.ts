/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

export function base64Converter(innerHTML: string): Blob[] {
  const image = innerHTML.match(/data:image(.*?)(?=")/g);

  if (!image) {
    throw new Error('No base64 encoded string found in "innerHTML"');
  }
  const base64 = image.map((str) => ({
    mime: str.match(/:(.*?);/)![1],
    base64: window.atob(str.split(",")[1]),
  }));

  return base64.map(({ mime, base64 }, i) => {
    const N = base64.length;
    const u8a = new Uint8Array(N).map((_, j) => base64.charCodeAt(j));

    return new Blob([u8a], { type: mime });
  });
}

export function fileToBase64(files: File[]) {
  return Promise.all<Promise<string | ArrayBuffer>[]>(
    files.map((f) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          const { result } = reader;

          if (!result) {
            reject();
            return;
          }
          resolve(result);
        });
        reader.addEventListener("error", (err) => {
          reject(err);
        });
        reader.readAsDataURL(f);
      });
    })
  );
}
