import { Imageservice } from "./image.entities";

export class News {
    id: string;
    title: string;
    content: string;
    tag: string;
    img: Imageservice[];
}