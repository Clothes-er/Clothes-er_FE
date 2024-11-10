import React from "react";
import Button from "./Button";
import { deleteFollows, postFollows } from "@/api/follows";

interface FollowButtonProps {
  userSid: string;
  isFollow: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const FollowButton = (props: FollowButtonProps) => {
  const { userSid, isFollow, onClick } = props;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollow) {
      await deleteFollows(userSid);
    } else {
      await postFollows(userSid);
    }
    onClick(e);
  };

  return (
    <Button
      text={isFollow ? "언팔로우" : "팔로우"}
      width="62px"
      height="28px"
      borderRadius="15px"
      background={isFollow ? "#ECECEC" : "#F2F0FF"}
      color={isFollow ? "#626262" : "#7562EA"}
      fontType="c1_medium"
      onClick={handleClick}
    />
  );
};

export default FollowButton;
