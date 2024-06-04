import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class BaseUrlService{
    public BaseUrl: string = 'http://localhost:5194/';
    public ImageUrl : string = 'http://localhost:5194/images/'
}

