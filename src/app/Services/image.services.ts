import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./BaseUrlServices.services";

@Injectable({
    providedIn : 'root'
})
export class ImageRealStateAPIService  {
    constructor(
     private httpClient : HttpClient,
     private baseUrlService : BaseUrlService,
    ){

    }
    async uploads(formData : FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'image/uploads',formData))
    }
    async select(formData : FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'image/select',formData))
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'image/findAll'))
      }
      async findByRealStateId(id : number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'image/findByRealstateId/' + id))
    }
    
}