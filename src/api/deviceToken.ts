import AuthAxios from "./authAxios";
import { getToken } from "firebase/messaging";
import { messaging } from "../core/notification/settingFCM";

export async function getDeviceToken() {
   const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  })
  alert("토큰: " + token);
}

export async function patchDeviceToken(token: string) {
  const data = await AuthAxios.patch(
    `/api/user/device-token`,
    { deviceToken: token },
  );

  return data;
}
