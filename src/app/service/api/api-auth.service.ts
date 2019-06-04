import { Injectable } from '@angular/core';
import { ApiUrls } from '../api-urls';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ResponseLogin } from './params/response-auth';
import { IndexeddbConstant } from 'src/app/core/db/indexeddb-constant';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private apiService: ApiService,private authService: AuthService, private apiUrls: ApiUrls) { }


   /**
  * auth(): Function to invoke login api
  * @param username : request data to pass through the api
  * @param email : request data to pass through the api
  * @param password : request data to pass through the api
  */
 login(username: string,  password: string): Observable<ResponseLogin> {
  let loginUrl = ApiUrls.BASE_URL + this.apiUrls.auth().login;
  let data = {
    "username": username,
    "password": password
  }
  localStorage.setItem("username", username)

  console.log(data);
  return this.apiService.doPostObservable(loginUrl, data);
}




}
