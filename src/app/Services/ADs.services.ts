import { Injectable } from "@angular/core";
import { BaseUrlService } from "./BaseUrlServices.services";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ADs } from "../Entities/ADs.entities";


@Injectable({
    providedIn: 'root'
})

export class ADsServices{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }

    async FindAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'advertisement/findAll'));
    }

    async FindByID(id: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'advertisement/findByID/' + id));
    }

    async searchByName(name: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'advertisement/searchByName/' + name));
    }

    async Delete(id: number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'advertisement/delete/' + id));
    }

    async Update(ads: ADs){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'advertisement/update', ads));
    }

    async Create(ads: ADs){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'advertisement/create', ads));
    }
}