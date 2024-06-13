import Axios from "@/api/axios";

export const getCoordsAddress = async (
  longitude: number | undefined,
  latitude: number | undefined
): Promise<any> => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  try {
    const response = await Axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
      {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );

    console.log("주소 변환 성공", response.data);
    const location = response.data.documents[0].road_address.address_name;
    return location;
  } catch (error) {
    console.error("주소 변환 실패", error);
    return null;
  }
};
