import { getDeviceToken, patchDeviceToken } from "@/api/deviceToken";
import { registerServiceWorker } from "@/util/notification";
import React, { useEffect, useState } from "react";

const AlertTest = () => {
  const [notificationPermission, setNotificationPermission] = useState<
    "granted" | "denied" | "default" | null
  >(null);

  useEffect(() => {
    if (notificationPermission === "granted") {
      registerServiceWorker();
    }
  }, [notificationPermission]);

  async function handleAllowNotification() {
    if (typeof window !== "undefined") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("알림 권한이 허용되었습니다.");
        setNotificationPermission(permission);
        const token = await getDeviceToken(); // Device token 가져오기
        if (token) {
          await patchDeviceToken(token);
        } else {
          console.error("Failed to get device token");
        }
      } else if (permission === "denied") {
        console.log("알림 권한이 거부되었습니다.");
      } else {
        console.log("사용자가 알림 권한을 결정하지 않았습니다.");
      }
    }
  }

  return <div onClick={handleAllowNotification}>알림 연결하기</div>;
};

export default AlertTest;
