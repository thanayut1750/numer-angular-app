import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumerapiService {

  constructor(private _http: HttpClient) { }

  token = 'akljnv13bvi2vfo0b0bw';


  getTest(): Observable<any> {
    return this._http.get<any>('api');
  }

  bisectionCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get("bisection/",{params})
  }

  falsepotionCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get("falsepotion/",{params})
  }

  onepointCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get("onepoint/",{params})
  }

  secantCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get("secant/",{params})
  }

  newraphCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get("newraph/",{params})
  }
}
