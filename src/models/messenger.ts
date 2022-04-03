import Message from "@/models/message.util";

export interface IDialog {
  _id: string | undefined;
  login: string;
  name: string;
  messageList: Message[];
  isGroup: boolean;
}

export interface ISourceDialog {
  _id: string | undefined;
  participantLoginList: string[];
  messageList: Message[];
  isGroup: boolean;
}


