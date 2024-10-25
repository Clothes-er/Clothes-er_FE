import Cookies from "js-cookie";

/* 액세스, 리프레시 토큰 */
export const setTokens = (
  accessToken: string,
  refreshToken: string,
  isAutoLogin: string
) => {
  // 자동 로그인 시 7일, 아니면 1시간 유효
  const options = isAutoLogin ? { expires: 7 } : { expires: 1 / 24 };
  Cookies.set("accessToken", accessToken, options);
  Cookies.set("refreshToken", refreshToken, { expires: 7 });
};

export const getAccessToken = () => {
  return Cookies.get("accessToken") || null;
};

export const getRefreshToken = () => {
  return Cookies.get("refreshToken") || null;
};

/* 자동 로그인 여부 */
export const setIsAutoLogin = (isAutoLogin: string) => {
  Cookies.set("isAutoLogin", isAutoLogin, { expires: 7 });
};

export const getIsAutoLogin = () => {
  return Cookies.get("isAutoLogin") || null;
};

/* 최초 로그인 여부 */
export const setIsFirstLogin = (isFirstLogin: string) => {
    const options = { expires: 7 };
  Cookies.set("isFirstLogin", isFirstLogin, options);
};

export const getIsFirstLogin = () => {
  return Cookies.get("isFirstLogin") || null;
};

/* 유예 상태 여부 (기능 제한) */
export const setIsSuspended = (isSuspended: string) => {
  const options = { expires: 7 };
  Cookies.set("isSuspended", isSuspended, options);
};

export const getIsSuspended = () => {
  return Cookies.get("isSuspended") || null;
};

/* 토큰 제거 */
export const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("isAutoLogin");
  Cookies.remove("isFirstLogin");
  Cookies.remove("isSuspended");
};