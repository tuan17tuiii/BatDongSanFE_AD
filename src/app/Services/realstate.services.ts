import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./BaseUrlServices.services";
import { RealState } from "../Entities/realstate.entities";

@Injectable({
    providedIn : 'root'
})
export class RealStateService  {
    constructor(
     private httpClient : HttpClient,
     private baseUrlService : BaseUrlService,
    ){

    }
    async findAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findAll'))
    }
    async findAll2(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findAll2'))
    }
    async create(realstate : RealState){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'realstate/create' , realstate))
    }
    async findById(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findById/'+ id))
    } 
    async findByCityRegion(city : string , region : string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByCityRegion/'+ city + "/" + region))
    } 
    async findByUserSellTrue(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByUserSellTrue/'+ id))
    } 
    async findByUserSellFalse(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByUserSellFalse/'+ id))
    } 
    async MarkExpired(){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'realstate/expire',{}))
    }
    async Update(realstate: RealState){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'realstate/Update', realstate));
    }
    async Delete(id: number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'realstate/Delete/' + id));
    }
    async FindByType(id: number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'realstate/findByType/' + id));
    }
    async searchByTitle(title: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'realstate/searchByTitle/' + title));
    }
    
}