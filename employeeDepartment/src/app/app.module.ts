import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthInterceptorService } from './service/HttpInterceptor/auth-interceptor.service';
import { NotificationModule } from '@progress/kendo-angular-notification';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    ForgotpasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    IconsModule, 
    BrowserAnimationsModule,
    DateInputsModule,
    InputsModule,
    LayoutModule,
    LabelModule,
    ButtonsModule,
    FormsModule,
    NotificationModule,
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
