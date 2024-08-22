import { useState } from "react";

type listType = "me" | "other" | "chat";

export const useCurrentTab = (listType: listType) => {
  const [currentTab, setCurrentTab] = useState<string>(
    listType === "chat" ? "rental" : "my"
  );
  const [currentSubTab, setCurrentSubTab] = useState<string>(
    listType === "chat" ? "" : "closet"
  );

  return { currentTab, setCurrentTab, currentSubTab, setCurrentSubTab };
};
