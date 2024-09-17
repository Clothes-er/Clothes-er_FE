export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const getIsSuspended = () => {
  if (typeof window !== "undefined") {
    console.log("확인", localStorage.getItem("isSuspended"));
    return localStorage.getItem("isSuspended");
  }
  return null;
};
