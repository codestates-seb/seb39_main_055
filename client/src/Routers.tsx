import { Route, Routes } from "react-router-dom";

import {
  Business,
  EditMyInfos,
  EditPlace,
  EditPost,
  Login,
  Mypage,
  NewPlace,
  NewPost,
  PlaceDetail,
  PlaceList,
  PostDetail,
  PostList,
  Search,
  Signup,
} from "./pages";

export const UserRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/business" element={<Business />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/mypage/edit" element={<EditMyInfos />} />
    </Routes>
  );
};

export const PostRouter = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewPost />} />
      <Route path="/edit" element={<EditPost />} />
      <Route path="/list" element={<PostList />} />
      <Route path="/:id" element={<PostDetail />} />
    </Routes>
  );
};

export const PlaceRouter = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewPlace />} />
      <Route path="/list" element={<PlaceList />} />
      <Route path="/edit" element={<EditPlace />} />
      <Route path="/:id" element={<PlaceDetail />} />
    </Routes>
  );
};

export const SearchRouter = () => {
  return (
    <Routes>
      <Route index element={<Search />} />
    </Routes>
  );
};
