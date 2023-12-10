
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { TitreComponent } from './components/titre/titre.component';
import { ApiComponent } from './api/api.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TitreComponent,
    ApiComponent
  ],
  imports:[
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      
      { path: '', component:ApiComponent},
      
  ])],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
