import AuthAxios from "./authAxios";

export const postFollows = async (userSid: string) => {
  try {
    const response = await AuthAxios.post(`/api/v1/follows/${userSid}`);
    console.log("팔로잉 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("팔로잉 실패");
    throw error;
  }
};

export const deleteFollows = async (userSid: string) => {
  try {
    const response = await AuthAxios.delete(`/api/v1/follows/${userSid}`);
    console.log("언팔로우 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("언팔로우 실패");
    throw error;
  }
};

export const getMyFollowersList = async () => {
  try {
    const response = await AuthAxios.get(`/api/v1/follows/followers`);
    console.log("나의 팔로워 목록 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("나의 팔로워 목록 조회 실패");
    throw error;
  }
};

export const getMyFollowingsList = async () => {
  try {
    const response = await AuthAxios.get(`/api/v1/follows/followings`);
    console.log("나의 팔로잉 목록 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("나의 팔로잉 목록 조회 실패");
    throw error;
  }
};