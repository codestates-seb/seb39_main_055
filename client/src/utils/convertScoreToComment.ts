export const convertScoreToComment = (score: number) => {
  if (score === 1) {
    return "별로에요";
  }

  if (score === 2) {
    return "그냥 그래요";
  }

  if (score === 3) {
    return "보통이에요";
  }

  if (score === 4) {
    return "맘에 들어요";
  }

  if (score === 5) {
    return "아주 좋아요";
  }

  return "별점을 남겨주세요.";
};
