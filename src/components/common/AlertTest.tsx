import { getDeviceToken } from "@/api/deviceToken";
import { registerServiceWorker } from "@/util/notification";
import React from "react";

const AlertTest = () => {
  async function handleAllowNotification() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
    } else if (permission === "denied") {
      console.log("알림 권한이 거부되었습니다.");
    } else {
      console.log("사용자가 알림 권한을 결정하지 않았습니다.");
    }
    await getDeviceToken();

    registerServiceWorker();
  }

  return <div onClick={handleAllowNotification}>알림 연결하기</div>;
};

export default AlertTest;
