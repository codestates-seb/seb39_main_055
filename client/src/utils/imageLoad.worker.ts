/* eslint-disable no-restricted-globals */

import { extractImageInfos } from "./imageProcessor";

self.addEventListener("message", async (e) => {
  const processed = await extractImageInfos(e.data);

  self.postMessage(processed);
});
