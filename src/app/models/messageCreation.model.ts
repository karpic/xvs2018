export class MessageCreation {
  constructor(
    public content: string,
    public toUserUsername: string,
    public reservationId: number
  ){}
}
