import { Restriction } from './restriction.model';
import { PricePlan } from './pricePlan.model';
import { AccommodationType } from './accomodationType.model';
import { AdditionalService } from './additionalService.model';
import { Category } from './category.model';
export class Accommodation {
  constructor(
    public id: number,
    public location: String,
    public type: AccommodationType,
    public description: String,
    public name: String,
    public images: Array<String>,
    public capacity: number,
    public additionalServices: Array<AdditionalService>,
    public pricePlan: Array<PricePlan>,
    //TODO ispraviti, dodati klasu za agenta
    public agent: String,
    public restrictions: Array<Restriction>,
    public category: Category
  ) {
  }
}
