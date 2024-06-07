import Axios from "@/api/axios";

export const getAddressCoords = async (address: string): Promise<any> => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  try {
    const response = await Axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );

    console.log("주소 변환 성공", response.data);
    const coords = response.data.documents[0].address;
    console.log("lat:", coords.y, "log:", coords.x);
    return coords;
  } catch (error) {
    console.error("주소 변환 실패", error);
    return null;
  }
};
