import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlowServiceService {

  constructor(private http: HttpClient) {
  }

  getTest(url: string, payload: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http.post(
      url,
      payload,
    {observe: 'response',
      headers: headers
    });
  }
}
