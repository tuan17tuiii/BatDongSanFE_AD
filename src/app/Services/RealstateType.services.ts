import { Injectable } from "@angular/core";
import { BaseUrlService } from "./BaseUrlServices.services";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ADs } from "../Entities/ADs.entities";
import { RealstateType } from "../Entities/RealstateType.entities";


@Injectable({
    providedIn: 'root'
})

export class RealstateTypeServices{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }

    async FindAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'typerealstate/findAll'));
    }

    async findById(id: number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'typerealstate/findById/' + id));
    }

    async Create(realstateType: RealstateType){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'typerealstate/Create', realstateType));
    }

    async Update(realstateType: RealstateType){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'typerealstate/Update', realstateType));
    }

    async Delete(id: number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'typerealstate/Delete/' + id));
    }
}