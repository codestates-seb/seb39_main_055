import { useNavigate } from "react-router-dom";

const PlaceList = () => {
  const state = {
    storeId: "14",
    category: "맛집",
    longitude: 127.045232157226,
    latitude: 170,
    addressName: "경기 수원시 영통구 권선로 895 (신동, 태장교회)",
    body: "진료 전 메뉴 500원진료 전 메뉴 500원진료 전 메뉴 500원",
    storeName: "몽땅카롱",
    phone: "010-1234-1234",
    homepage: "www.test.com",
    storeImages: [
      {
        storeImageStatus: "STORE_IMAGE_EXIST",
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user3-fa23750b18a7cf93807a46e1b6490d0a1664182287199.png",
      },
      {
        storeImageStatus: "STORE_IMAGE_EXIST",
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user3-4894e26401088621423763e8ea6273f51664182287322.png",
      },
    ],
  };

  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/place/edit", { state })}>
      button
    </button>
  );
};

export default PlaceList;
