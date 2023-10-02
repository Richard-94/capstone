

import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignUp } from "src/app/Classes/signUp";

@Injectable({
  providedIn: 'root'
})
export class SignupService extends DataService <SignUp> {


    constructor(http: HttpClient) {
      super(http, 'http://localhost:8083/api/auth/register');
    }

}
