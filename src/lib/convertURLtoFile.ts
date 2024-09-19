export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  // url에서 파일 확장자와 파일명 추출 (기본값 제공)
  const ext = url.split(".").pop() || "jpg";
  let filename = url.split("/").pop() || "filename.jpg";

  // 파일명에서 언더바가 존재하면 언더바 뒷부분을 추출
  if (filename.includes("_")) {
    filename = filename.split("_")[1];
  }

  // MIME 타입 설정
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};
