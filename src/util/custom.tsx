import { LEVEL_MESSAGE } from "@/constants/message";

export function getLevelMessage(level: number) {
  let levelMsg = 0;

  switch (true) {
    case level <= 4:
      levelMsg = 0;
      break;
    case level <= 8:
      levelMsg = 1;
      break;
    case level <= 12:
      levelMsg = 2;
      break;
    case level <= 16:
      levelMsg = 3;
      break;
    case level <= 20:
      levelMsg = 4;
      break;
    default:
      levelMsg = 0;
      break;
  }
  return LEVEL_MESSAGE[levelMsg];
}
