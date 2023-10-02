
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TransformDirective } from "./Directives/transform.directive";
import { UserInfoComponent } from "./Information/user-info/user-info.component";
import { AuthInterInterceptor } from "./Interceptor/auth-inter.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./home-navbar/authentication/login/login/login.component";
import { RegisterComponent } from "./home-navbar/authentication/register/register/register.component";
import { HomeComponent } from "./home-navbar/home/home.component";
import { NavbarComponent } from "./home-navbar/navbar/navbar.component";
import { NavigateComponent } from "./home-navbar/navigate/navigate.component";
import { NotFoundComponent } from "./home-navbar/not-found/not-found.component";
import { MdModule } from "./modules/md/md.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './Admin/admin/admin.component';
import { AuthGuard } from "./Guards/auth-guard.service";
import { SportsEventsComponent } from './Announcements/Sports/sports-events/sports-events.component';
import { FoodEventsComponent } from './Announcements/food-events/food-events.component';
import { DetailsPageComponent } from './Details/details-page/details-page.component';
import { ChildrenComponent } from './Announcements/children/children.component';
import { AuthService } from "./Data-Services/services/auth.service";
import { SummaryPipe } from "./Pipes/summary.pipe";
import { LoadingComponent } from './loading/loading.component';
import { ResolverService } from './Data-Services/services/resolver.service';
import { ShowTextPipe } from "./Pipes/showText.pipe";

import { WarningComponent } from './warning/warning.component';
import { SearchComponent } from "./search/search.component";
import { FooterComponent } from './footer/footer.component';











@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    SummaryPipe,
    TransformDirective,
     NavigateComponent,
     UserInfoComponent,
     AdminComponent,
     SportsEventsComponent,
     FoodEventsComponent,
     DetailsPageComponent,
     ChildrenComponent,
     LoadingComponent,
     ShowTextPipe,
     SearchComponent,
     WarningComponent,
     FooterComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    RouterModule.forRoot([
      {
        path:'',
        component:LoadingComponent,
        resolve: { loading: ResolverService },
      },
      {
        path:'home',component:HomeComponent,

      },
      { path: 'admin',
        component: AdminComponent,
        canActivate:[AuthGuard]

      },
      {
        path: 'userInfo/:username',
        component: UserInfoComponent,
      },
      {
        path: 'navbar/:type/:id',
        component: DetailsPageComponent
      },
      {
        path: 'search/:type',
        component: SearchComponent
      },

      {
        path: '**',
        component: NotFoundComponent
      }
    ]),

  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterInterceptor, multi: true },
    AuthService,
    ResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
