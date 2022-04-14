export interface IMessage {
  sendTime: string;
  isDelivered: boolean;
  text: string;
  senderLogin: string;
  _id?: string;
}
