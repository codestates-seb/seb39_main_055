/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { md5 as md5Hash } from "hash-wasm";

export async function extractImageInfos(files: File[]) {
  if (!files) return [];

  return Promise.all(
    files.map(async (file) => {
      const encoded = await blobToBase64(file);
      const md5 = await md5Hash(encoded);

      return {
        file,
        md5,
        uri: URL.createObjectURL(file),
      };
    })
  );
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

export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const { result } = reader;

      if (!result) {
        reject();
        return;
      }
      resolve(result as string);
    });
    reader.addEventListener("error", (err) => {
      reject(err);
    });

    reader.readAsDataURL(blob);
  });
}
