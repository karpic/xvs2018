import { MessageView } from './messageView.model';
export class ReservationView {
  constructor(
    public id: number,
    public accommodationName: string,
    public accommodationId: number,
    public registeredUserUsername: string,
    public startingDate: Date,
    public endingDate: Date,
    public confirmed: boolean,
    public messages: Array<MessageView>
  ){}
}
