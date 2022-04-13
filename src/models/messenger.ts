import {IMessage} from "@/models/message";

export interface IDialog {
  _id: string | undefined;
  login: string;
  name: string;
  messageList: IMessage[];
  participantLoginList: string[];
  isGroup: boolean;
  isAllMessagesReceived: boolean;
}

export interface ISourceDialog {
  _id: string | undefined;
  participantLoginList: string[];
  messageList: IMessage[];
  isGroup: boolean;
  isAllMessagesReceived: boolean;
}


