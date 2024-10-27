import { getDeviceToken, patchDeviceToken } from "@/api/deviceToken";

export async function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js");
      console.log("Service Worker 등록 성공:", registration);
    } catch (error) {
      console.log("Service Worker 등록 실패:", error);
    }
  }
}

export async function handleAllowNotification() {
  if (typeof window === "undefined") return;
  
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
      registerServiceWorker();
      const token = await getDeviceToken();
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
    return permission;
}
