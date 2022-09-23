import { submitPost } from "../../../apis";
import PostForms from "../../../components/PostForms/PostForms";

const NewPost = () => {
  return <PostForms buttonText="등록하기" mutation={submitPost} />;
};

export default NewPost;
