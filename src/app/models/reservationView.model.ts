import { MessageView } from './messageView.model';
export class ReservationView {
  constructor(
    public id: number,
    public accommodatioName: string,
    public registeredUserUsername: string,
    public startingDate: Date,
    public endingDate: Date,
    public confirmed: boolean,
    public messages: Array<MessageView>
  ){}
}
