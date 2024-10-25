/* accessToken, refreshToken */
export const setTokens = (
  accessToken: string,
  refreshToken: string,
  isAutoLogin?: boolean
) => {
  if (typeof window !== "undefined") {
    const storage =
      isAutoLogin || getIsAutoLogin() ? localStorage : sessionStorage;
    storage.setItem("accessToken", accessToken);
    storage.setItem("refreshToken", refreshToken);
    }
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken")
    );
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken")
    );
  }
  return null;
};

/* 자동 로그인 여부 */
export const setIsAutoLogin = (isAutoLogin: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("isAutoLogin", isAutoLogin);
    }
};

export const getIsAutoLogin = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("isAutoLogin")
    );
  }
  return null;
};

/* 최초 로그인 여부 */
export const setIsFirstLogin = (isFirstLogin: string, autoLogin: boolean) => {
    if (typeof window !== "undefined") {
        const storage = autoLogin ? localStorage : sessionStorage;
        storage.setItem("isFirstLogin", isFirstLogin);
    }
};

export const getIsFirstLogin = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("isFirstLogin") ||
      sessionStorage.getItem("isFirstLogin")
    );
  }
  return null;
};

/* 유예 상태 여부 (기능 제한) */
export const setIsSuspended = (isSuspended: string, autoLogin: boolean) => {
    if (typeof window !== "undefined") {
        const storage = autoLogin ? localStorage : sessionStorage;
        storage.setItem("isSuspended", isSuspended);
    }
};

export const getIsSuspended = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("isSuspended") ||
      sessionStorage.getItem("isSuspended")
    );
  }
  return null;
};

/* 토큰 제거 */
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("isAutoLogin");
  localStorage.removeItem("isFirstLogin");
  localStorage.removeItem("isSuspended");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("isAutoLogin");
  sessionStorage.removeItem("isFirstLogin");
  sessionStorage.removeItem("isSuspended");
};