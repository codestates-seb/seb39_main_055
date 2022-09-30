import { ThreadImages } from "../types";

/* eslint-disable no-plusplus */
type CompareImageList = (arr1: ThreadImages[], arr2: ThreadImages[]) => boolean;

/**
 * 게시글 수정 시 수정 전의 이미지 배열과 수정 후의 이미지 배열의 값을 비교
 * 두 개의 이미지 배열의 값들이 모두 같으면 true를 return
 * 두 개의 이미지 배열의 값들이 다르면 false를 return
 * @param arr1 수정 전의 이미지 배열
 * @param arr2 수정 후의 이미지 배열
 */
export const compareImageList: CompareImageList = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].uri !== arr2[i].uri) {
      return false;
    }
  }

  return true;
};
