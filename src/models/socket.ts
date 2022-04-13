import {IMessage} from "@/models/message";

export enum ESocketEvents {
  Init = '2',
  AddMessageInDialog = '3',
  AddMessageInNewDialog = '4',
  DialogCreate = '5',
  ForceDisconnect = '6',
  GetMessageList = '7',
  Message = '8'
}

export interface IAddMessageInDialogRequest {
  dialogId: string;
  text: string;
}

export interface IAddMessageInNewDialogRequest {
  companionLogin: string;
  text: string;
}

export interface IAddMessageInNewDialogResponse {
  dialogId: string;
  message: IMessage;
}

export interface IGetMessageListRequest {
  dialogId: string;
  messageIndex: number;
}

export interface IGetMessageListResponse {
  dialogId: string;
  isAllMessagesReceived: boolean;
  messageList: IMessage[];
}
