import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumerapiService {

  constructor(private _http: HttpClient) { }

  token = 'akljnv13bvi2vfo0b0bw';
  numerApiUrl = `http://localhost:8000/`


  bisectionCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get(this.numerApiUrl+"bisection",{params})
  }

  falsepotionCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get(this.numerApiUrl+"falsepotion",{params})
  }

  onepointCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get(this.numerApiUrl+"onepoint",{params})
  }

  secantCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get(this.numerApiUrl+"secant",{params})
  }

  newraphCall():Observable<any> {
    const params = new HttpParams().append('token', this.token);
    return this._http.get(this.numerApiUrl+"newraph",{params})
  }
}
