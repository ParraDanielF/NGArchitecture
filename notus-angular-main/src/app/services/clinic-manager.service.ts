import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ClinicManagerService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  sendMessage() : void{
    const url = 'https://rkbxeoc25h.execute-api.us-east-2.amazonaws.com/prod/event/message';
    this.http.post(url, 
      {'operation' : 'sendMessage' , 'data' : { message : "{'user' : 777777777, 'status' : 'AVAILABLE_TO_BILL'}" }}
      ,{
      headers: this.headers
    }).subscribe((res) => {
      console.log("[Success]", res);
    },
    (err) => {
      console.log("UPS THERE IS A ERROR", err);
    });
  }

  aws() : void{
    /** logic goes here */
  }
}
