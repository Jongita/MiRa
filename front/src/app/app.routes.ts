import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:"product/list",component:ListProductsComponent},

    {path: "auth/signin", component:SigninComponent},
    {path: "auth/login", component:LoginComponent},

    {path: "", component:HomeComponent}

];
