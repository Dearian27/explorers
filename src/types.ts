export interface PlayerMessage {
  id: number;
  senderId: number;
  receiversId: number[];
  sendDay: number;
  receiptDay: number;
  type: "clone";
  text: string;
}
