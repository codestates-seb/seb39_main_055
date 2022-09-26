import axios from "axios";
import { useQuery } from "react-query";

const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;

interface Coordinate {
  x: number;
  y: number;
}

interface ConvertResponse {
  documents: { road_address: { address_name: string } }[];
}

async function convertCoorToAddress(
  x: number,
  y: number
): Promise<ConvertResponse> {
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?y=${y}&x=${x}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`,
      },
    }
  );

  return data.documents[0].road_address.address_name;
}

export default function useCoordinateConvert(coordinate: Coordinate) {
  const {
    data: address,
    isLoading,
    isFetched,
  } = useQuery(
    ["coordinateToAddress", coordinate],
    () => convertCoorToAddress(coordinate.x, coordinate.y),
    {
      enabled: !!(coordinate.x && coordinate.y),
      refetchOnWindowFocus: false,
      onSuccess: () => console.log("성공"),
      onError: () => console.log("실패"),
    }
  );

  return { address, isLoading };
}
