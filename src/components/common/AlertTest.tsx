import { registerServiceWorker } from "@/util/notification";
import React from "react";

const AlertTest = () => {
  async function handleAllowNotification() {
    const permission = await Notification.requestPermission();

    registerServiceWorker();
  }

  return <div onClick={handleAllowNotification}>ServiceWorker 연결하기</div>;
};

export default AlertTest;
