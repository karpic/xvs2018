export class PricePlan {
  constructor(
    public id: number,
    public startingDate: Date,
    public endingDate: Date,
    public price: number
  ){}
}
