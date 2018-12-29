import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from'@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { AddproductComponent } from './addproduct/addproduct.component'; 
import { FileSelectDirective } from 'ng2-file-upload';
import { SinglecComponent } from './singlec/singlec.component';
import { ChartsModule } from 'ng2-charts';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { CompanyprofilepageComponent } from './companyprofilepage/companyprofilepage.component';

import {
   SocialLoginModule,
   AuthServiceConfig,
   GoogleLoginProvider,
} from "angular5-social-login";

const routes: Routes = [
  { path: '',
   component: HomeComponent,
   pathMatch:'full'
},
{ path: 'dash',
   component: DashComponent,
   pathMatch:'full'
},
{ path: 'addproduct',
   component:AddproductComponent,
   pathMatch:'full'
},
{ path: 'single',
   component:SinglecComponent,
   pathMatch:'full'
},
{ path: 'companyp',
   component:CompanyprofileComponent,
   pathMatch:'full'
},
{ path: 'settings',
   component:SettingsComponent,
   pathMatch:'full'
},
{ path: 'company/:id',
   component:CompanyprofilepageComponent,
   pathMatch:'full'
},

];

export function getAuthServiceConfigs() {
   let config = new AuthServiceConfig(
       [
         {
           id: GoogleLoginProvider.PROVIDER_ID,
           provider: new GoogleLoginProvider("930432577405-cmi7pnjlsrb4bpp8dmhglm5j0r0v7nb5.apps.googleusercontent.com")
         }
      ]     
   );
   return config;
 }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DashComponent,
    AddproductComponent,   
     FileSelectDirective, SinglecComponent, CompanyprofileComponent, SettingsComponent, CompanyprofilepageComponent,
  ],
  imports: [ChartsModule,
    BrowserModule,RouterModule.forRoot(routes) ,HttpClientModule,FormsModule,ReactiveFormsModule,
    SocialLoginModule

  ],
  providers: [
   {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
