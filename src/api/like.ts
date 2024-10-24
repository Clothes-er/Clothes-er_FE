import AuthAxios from "./authAxios"

export const postRentalLike = async(rentalId: number) => {
   try {
    const response = await AuthAxios.post(`/api/v1/rentals/${rentalId}/like`);
    console.log("대여글 찜 생성 성공");
    return response.data;
} catch (error){
       console.log("대여글 찜 생성 실패");
    throw error;
   }
}

export const deleteRentalLike = async(rentalId: number) => {
   try {
    const response = await AuthAxios.delete(`/api/v1/rentals/${rentalId}/like`);
    console.log("대여글 찜 삭제 성공");
    return response.data;
} catch (error){
       console.log("대여글 찜 삭제 실패");
    throw error;
   }
}

export const getRentalLikes = async() => {
   try {
    const response = await AuthAxios.get(`/api/v1/closet/like-rentals`);
    console.log("나의 대여글 찜 목록 조회 성공");
    return response.data;
} catch (error){
       console.log("나의 대여글 찜 목록 조회 실패");
    throw error;
   }
}

export const postClothesLike = async (clothesId: number) => {
  try {
    const response = await AuthAxios.post(`/api/v1/clothes/${clothesId}/like`);
    console.log("보유글 찜 생성 성공");
    return response.data;
  } catch (error) {
    console.log("보유글 찜 생성 실패");
    throw error;
  }
};

export const deleteClothesLike = async (clothesId: number) => {
  try {
    const response = await AuthAxios.delete(
      `/api/v1/clothes/${clothesId}/like`
    );
    console.log("보유글 찜 삭제 성공");
    return response.data;
  } catch (error) {
    console.log("보유글 찜 삭제 실패");
    throw error;
  }
};

export const getClothesLikes = async () => {
  try {
    const response = await AuthAxios.get(`/api/v1/closet/like-clothes`);
    console.log("나의 보유글 찜 목록 조회 성공");
    return response.data;
  } catch (error) {
    console.log("나의 보유글 찜 목록 조회 실패");
    throw error;
  }
};