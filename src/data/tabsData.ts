export const tabs = [
  { path: "/home", icon: "ic_home", label: "홈" },
  { path: "/chat", icon: "ic_chat", label: "채팅" },
  { path: "/closet", icon: "ic_closet", label: "옷장 구경" },
  { path: "/mycloset", icon: "ic_my", label: "나의 옷장" },
];

export const myClosetTabs = [
  { tab: "보유", path: "/my", sub : [{subTab: "옷장", path: "/closet"}, {subTab:"공유 등록", path: "/share"}]},
  { tab: "거래 현황", path: "/transaction", sub : [{subTab: "공유", path: "/sharing"}, {subTab:"대여", path: "/rental"}]},
  { tab: "찜", path: "/storage"},
];