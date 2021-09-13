import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { InformationComponent } from './components/information/information.component';
import { RegisterAComponent } from './components/register-a/register-a.component';
import { RegisterBComponent } from './components/register-b/register-b.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderAComponent } from './components/order-a/order-a.component';
import { OrderBComponent } from './components/order-b/order-b.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { FormComponent } from './components/form/form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { RegisterComponent } from './components/register/register.component';
import {MatSelectModule} from '@angular/material/select';
import {  DateAdapter, MatNativeDateModule, MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';
import { OrderComponent } from './components/order/order.component';
import { HighllightPipe } from './pipes/highllight.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DialogOrderComponent } from './components/dialog-order/dialog-order.component';
import { AddProductsComponent } from './components/add-products/add-products.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AboutComponent,
    InformationComponent,
    RegisterAComponent,
    RegisterBComponent,
    ProductsComponent,
    OrderAComponent,
    OrderBComponent,
    DialogUserComponent,
    FormComponent,
    RegisterComponent,
    DialogAlertComponent,
    OrderComponent,
    HighllightPipe,
    DialogOrderComponent,
    AddProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,  
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  exports: [
    MatMomentDateModule,
    // ...
  ],
  providers: [{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
              { provide: MAT_DATE_LOCALE, useValue: 'en-AU' }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
