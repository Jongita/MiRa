import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { viewGuard } from './guards/view.guard';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UpdateUsersComponent } from './components/users/update-users/update-users.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ViewProductComponent } from './components/products/view-product/view-product.component';
import { ShowProductsComponent } from './components/products/show-products/show-products.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

export const routes: Routes = [
    {path:"product/list",component:ListProductsComponent},

    {path:"product/show",component:ShowProductsComponent},

    {path:"products/:id", component:UpdateProductComponent},

    {path:"new", component:NewProductComponent},

    {path: "product/:id", component:ViewProductComponent},

    {path: "auth/signin", component:SigninComponent},
    {path: "auth/login", component:LoginComponent},

    {
        path: "", component:HomeComponent,
  
    },

    {path: "cart", component:CartComponent},

    {
        path:"users/list", component:ListUsersComponent,
       
    },

    {
        path:"users/:id", component:UpdateUsersComponent,
        
    },

    {
        path:"profile",
        component:UserProfileComponent
    },

      {
        path:"profile/update",
        component:ProfileComponent
    },


];
