import AuthAxios from "./authAxios";

export async function patchDeviceToken(token: string) {
  const data = await AuthAxios.patch(
    `/api/user/device-token`,
    { deviceToken: token },
  );

  return data;
}
