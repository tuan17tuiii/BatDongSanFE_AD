import { Image } from "./image.entities";
import { RealstateType } from "./RealstateType.entities";


export class RealState{
    id : string ; 
    title : string ; 
    describe :  string ; 
    price : number ; 
    type : number ; 
    acreage : number ; 
    bedrooms : number  ; 
    bathrooms : number ; 
    status : boolean ; 
    createdAt : string;
    city : string ; 
    street : string ; 
    region : string ; 
    typeRealState : RealstateType ; 
    nameusersell:string;
    image:Image[]
    lastImage : Image
    usersellId : string 
    transactionType : string ; 
    sold : boolean ; 
    expired : boolean ; 
    createdEnd : string ; 
}