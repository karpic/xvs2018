import { UserImpressionView } from './userImpressionView.model';
import { AdditionalServiceView } from './additionalServiceView.model';
import { PricePlanView } from "./pricePlanView.model";
import { RestrictionView } from "./restrictionView.model";

export class AccommodationView {
  constructor(
    public id: number,
    public location: string,
    public typeName: string,
    public description: string,
    public name: string,
    public images: Array<Document>,
    public capacity: number,
    public additionalServices: Array<AdditionalServiceView>,
    public pricePlan: Array<PricePlanView>,
    public agentUsername: string,
    public restrictions: Array<RestrictionView>,
    public categoryName: string,
    public userImpressions: Array<UserImpressionView>,
    public rating: number
  ){}
}
