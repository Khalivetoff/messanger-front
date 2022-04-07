import {IMessage} from "@/models/message";
import {IDialog} from "@/models/messenger";

export enum ESocketEvents {
  Init = '2',
  AddMessageInDialog = '3',
  AddMessageInNewDialog = '4',
  DialogCreate = '5',
  ForceDisconnect = '6',
  GetMessages = '7',
  Message = '8'
}

export interface IAddMessageInDialogDataSend {
  dialogId: string;
  text: string;
}

export interface IAddMessageInNewDialogDataSend {
  companionLogin: string;
  text: string;
}

export interface IAddMessageInDialogDataGet {
  dialogId: string;
  message: IMessage;
}
