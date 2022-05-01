import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumerapiService {

  constructor(private _http: HttpClient) { }
  //
  numerApiUrl = "http://localhost:8000/"

  testApiCall():Observable<any> {
    return this._http.get(this.numerApiUrl)
  }


}
