import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class ApiUrls {
  



    // static API_BASE_URL: string;
    public static BASE_URL: string = environment.baseUrl;
    

    getBaseUrl(): string {
        return ApiUrls.BASE_URL;
    }

    auth(){
        return { 
            login:'login'
        }

    }



    analysis() {
        return {
            trips: 'trips',
            tripsV2: 'trips/new'
        }
    }


    /* *
     *  Report 
     * 
     * 
     */



}
