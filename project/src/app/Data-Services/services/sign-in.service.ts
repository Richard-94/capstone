
import { DataService } from "./data.service";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SignIn } from "src/app/Classes/signIn";

@Injectable({
  providedIn: 'root'
})
export class SignInService extends DataService <SignIn> {

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8083/api/auth/login');
  }
}
