import { useState } from "react";

export const useCurrentTab = () => {
  const [currentTab, setCurrentTab] = useState<string>("my");
  const [currentSubTab, setCurrentSubTab] = useState<string>("closet");

  return { currentTab, setCurrentTab, currentSubTab, setCurrentSubTab };
};
