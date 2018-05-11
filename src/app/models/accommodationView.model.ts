import { PricePlanView } from "./pricePlanView.model";
import { RestrictionView } from "./restrictionView.model";

export class AccommodationView {
  constructor(
    public id: number,
    public location: string,
    public typeName: string,
    public description: string,
    public name: string,
    public imagesPath: Array<string>,
    public capacity: number,
    public additionalServicesName: Array<String>,
    public pricePlan: Array<PricePlanView>,
    public agentUsername: string,
    public restrictions: Array<RestrictionView>,
    public categoryName: string
  ){}
}
