import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { OnlyUsersGuard } from './guards/only-users.guard';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent },
  {path: 'form', component: HeaderComponent},
  {path: 'form', component: FormComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'order', component: OrderComponent},
  {path: 'main', component: ProductsComponent, canActivate:[OnlyUsersGuard]},

  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
