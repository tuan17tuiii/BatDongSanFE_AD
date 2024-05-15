import { Injectable } from "@angular/core";
import { BaseUrlService } from "./BaseUrlServices.services";
import { HttpClient } from "@angular/common/http";
import { User } from "../Entities/User.entities";
import { lastValueFrom } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class UserServices{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }

    async Register(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/Register', account));
    }

    async Login(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/Login', account));
    }

    async Verify(securityCode: string, username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/Verify/' + securityCode + '/' + username));
    }

    async findByUsername(username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByUsername/' + username));
    }
}