import { ThreadImages, User } from "../../types";
import { axiosInstance } from "../../utils";
import { uploadImages } from "../post";

interface SignupResponse extends User {
  socialLogin: "original";
}
interface SignupForm {
  nickname: string;
  email: string;
  password: string;
  image: ThreadImages | string;
}

export const signupUser = async (
  payload: SignupForm
): Promise<SignupResponse> => {
  const { image } = payload;

  let imageObj: ThreadImages;

  if (typeof image === "string") {
    imageObj = { file: null, uri: image, id: image };
  } else {
    imageObj = image;
  }

  const [newImage] = await uploadImages([imageObj]);
  const { data } = await axiosInstance.post("v1/sign-up", {
    ...payload,
    image: newImage,
  });

  return data.data;
};
