import { useState } from "react";

type listType = "me" | "other" | "chat" | "follow" | "closet";

export const useCurrentTab = (listType: listType) => {
  const [currentTab, setCurrentTab] = useState<string>(
    listType === "chat"
      ? "rental"
      : listType === "follow"
      ? "follower"
      : listType === "closet"
      ? "all"
      : "my"
  );
  const [currentSubTab, setCurrentSubTab] = useState<string>(
    listType === "chat" || listType === "follow" || listType === "closet"
      ? ""
      : "closet"
  );

  return { currentTab, setCurrentTab, currentSubTab, setCurrentSubTab };
};
