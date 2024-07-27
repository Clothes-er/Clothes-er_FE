export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  // url에서 파일 확장자와 파일명 추출 (기본값 제공)
  const ext = url.split(".").pop() || "jpg";
  const filename = url.split("/").pop() || "filename.jpg";

  // MIME 타입 설정
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};
