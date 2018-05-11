export class MessageView {
  constructor(
    public id: number,
    public content: string,
    public fromUserUsername: string,
    public toUserUsername: string
  ){}
}
