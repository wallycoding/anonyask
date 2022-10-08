import { AvatarProps } from "@bigheads/core";

interface MessageEntity {
  id: string;
  nid: number;
  message: string;
  avatar: AvatarProps
}

export default MessageEntity;