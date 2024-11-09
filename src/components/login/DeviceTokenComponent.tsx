"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/util/notification";
import { getDeviceToken, patchDeviceToken } from "@/api/deviceToken";

const DeviceTokenComponent = ({
  onTokenRequestComplete,
}: {
  onTokenRequestComplete: () => void;
}) => {
  useEffect(() => {
    const requestDeviceToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("알림 권한이 허용되었습니다.");
        await registerServiceWorker();

        const token = await getDeviceToken();
        if (token) {
          await patchDeviceToken(token);
          console.log("Device token 발급 및 전송 완료");
        } else {
          console.error("Failed to get device token");
        }
      } else if (permission === "denied") {
        console.log("알림 권한이 거부되었습니다.");
      } else {
        console.log("사용자가 알림 권한을 결정하지 않았습니다.");
      }

      onTokenRequestComplete();
    };

    requestDeviceToken();
  }, []);

  return null;
};

export default DeviceTokenComponent;
