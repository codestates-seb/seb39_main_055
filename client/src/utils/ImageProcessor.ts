/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { md5 as md5Hash } from "hash-wasm";

export async function extractImageInfos(innerHTML: string) {
  const encoded = innerHTML.match(/data:image(.*?)(?=")/g)?.at(-1);

  if (!encoded) return [];

  const blob = base64ToBlob(encoded)[0];
  const md5 = await md5Hash(encoded);

  return [
    {
      uri: URL.createObjectURL(blob),
      blob,
      md5,
    },
  ];
}

export function base64ToBlob(encoded: string): Blob[] {
  const image = encoded.match(/data:image/g);

  if (!image) {
    throw new Error('No base64 encoded string found in "innerHTML"');
  }
  const base64 = [encoded].map((str) => ({
    mime: str.match(/:(.*?);/)![1],
    base64: window.atob(str.split(",")[1]),
  }));

  return base64.map(({ mime, base64 }, i) => {
    const N = base64.length;
    const u8a = new Uint8Array(N).map((_, j) => base64.charCodeAt(j));

    return new Blob([u8a], { type: mime });
  });
}

export function blobToBase64(blobs: Blob[]) {
  return Promise.all<Promise<string | ArrayBuffer>[]>(
    blobs.map((b) => {
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

        reader.readAsDataURL(b);
      });
    })
  );
}
