export class MessageCreation {
  constructor(
    public content: string,
    public toUserId: number,
    public reservationId: number
  ){}
}
