export const levelTextMap: { [key: number]: string } = {
    0: "솜",
    1: "면",
    2: "린넨",
    3: "울",
    4: "실크",
    5: "캐시미어",
  };
  
  export const getLevelText = (level: number): string => {
    return levelTextMap[level] || "Unknown";
  };
  