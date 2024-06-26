import { Advertisement } from "./advertisement.entities";
import { Image } from "./image.entities";

export class User{
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    roleId: number;
    advertisement_id: number;
    advertisement : Advertisement
    status: boolean;
    securityCode: string;
    avatar: string;
    statusUpdate: boolean;
    image: Image[];
}