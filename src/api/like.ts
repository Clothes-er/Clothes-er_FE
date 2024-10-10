import AuthAxios from "./authAxios"

export const postHomeLike = async(rentalId: number) => {
   try {
    const response = await AuthAxios.post(`/api/v1/rentals/${rentalId}/like`);
    console.log("대여글 찜 생성 성공");
    return response.data;
} catch (error){
       console.log("대여글 찜 생성 실패");
    throw error;
   }
}

export const deleteHomeLike = async(rentalId: number) => {
   try {
    const response = await AuthAxios.delete(`/api/v1/rentals/${rentalId}/like`);
    console.log("대여글 찜 삭제 성공");
    return response.data;
} catch (error){
       console.log("대여글 찜 삭제 실패");
    throw error;
   }
}