import AuthAxios from "./authAxios";

export const getIsNotification = async () => {
  try {
    const response = await AuthAxios.get(`/api/v1/notifications/home`);
    console.log("홈 알림 확인 여부 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("홈 알림 확인 여부 조회 실패");
    throw error;
  }
};

export const getNotificationList = async () => {
  try {
    const response = await AuthAxios.get(`/api/v1/notifications`);
    console.log("알림 목록 조회 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("알림 목록 조회 실패");
    throw error;
  }
};
export const patchReadNotification = async (notificationId:number) => {
  try {
    const response = await AuthAxios.patch(
      `/api/v1/notifications/${notificationId}`
    );
    console.log("알림 읽음 처리 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("알림 읽음 처리 실패");
    throw error;
  }
};