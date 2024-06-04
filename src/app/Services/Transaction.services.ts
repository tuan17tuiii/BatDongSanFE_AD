import { Injectable } from "@angular/core";
import { BaseUrlService } from "./BaseUrlServices.services";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class TransactionServices{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }

    async FindAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Transaction/findAll'));
    }

    async DateRange(from: string, to: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Transaction/findByDates/' + from + '/' + to));
    }

    async Today(date: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Transaction/today/' + date));
    }
}