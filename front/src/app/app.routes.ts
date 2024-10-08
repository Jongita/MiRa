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
import { adminGuard } from './guards/admin.guard';
import { CartCheckoutComponent } from './components/cart/cart-checkout/cart-checkout.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { AboutComponent } from './components/about/about.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';

export const routes: Routes = [
    {path:"product/list",component:ListProductsComponent},

    {path:"product/show",component:ShowProductsComponent,
        canActivate:[adminGuard]
    },

    {path:"products/:id", component:UpdateProductComponent,
        canActivate:[adminGuard]
    },

    {path:"new", component:NewProductComponent,
        canActivate:[adminGuard]
    },

    {path: "product/:id", component:ViewProductComponent},

    {path: "auth/signin", component:SigninComponent},
    {path: "auth/login", component:LoginComponent},

    {
        path: "", component:HomeComponent,
  
    },

    {path: "cart", component:CartComponent,
        canActivate:[viewGuard]
    },

     {path: "cart/checkout", component:CartCheckoutComponent
    },

    {   
        path:"orders/list",component:ListOrdersComponent,
        canActivate:[adminGuard]
    },

    {   
        path:"orders/success",component:OrderSuccessComponent,
        canActivate:[viewGuard]
    },

    {
        path:"users/list", component:ListUsersComponent,
       canActivate:[adminGuard]
    },

    {
        path:"users/:id", component:UpdateUsersComponent,
        canActivate:[adminGuard]
    },

    {
        path:"profile",
        component:UserProfileComponent
    },

      {
        path:"about",
        component:AboutComponent
    },

      {
        path:"profile/update",
        component:ProfileComponent
    },


];
