import { ReservationView } from './reservationView.model';
import { UserImpressionView } from './userImpressionView.model';

export class UserView {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public registrationDate: Date,
    public reservations: Array<ReservationView>,
    public userImpression: Array<UserImpressionView>,
    public blocked: boolean
  ) {}
}
