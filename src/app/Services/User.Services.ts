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

    async FindAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAll'));
    }

    async FindAllAdmin(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAllAdmin'));
    }

    async FindAllUser(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAllUser'));
    }

    async Register(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/Register', account));
    }

    async LoginAdmin(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/loginAdmin', account));
    }

    async Verify(securityCode: string, username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/Verify/' + securityCode + '/' + username));
    }

    async findByUsername(username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByUsername/' + username));
    }

    async Update(user: User){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/Update', user));
    }
}