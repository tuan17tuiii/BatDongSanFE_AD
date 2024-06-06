import { Injectable } from "@angular/core";
import { BaseUrlService } from "./BaseUrlServices.services";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ADs } from "../Entities/ADs.entities";


@Injectable({
    providedIn: 'root'
})

export class RealstateTypeServices{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }

    async FindAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'typerealstate/findAll'));
    }
}