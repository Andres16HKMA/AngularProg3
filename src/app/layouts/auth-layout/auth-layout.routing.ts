import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    {
        path: "security",
        loadChildren:() => import('src/app/pages/security/security.module').then(m=>m.TheSecurityModule)
    },
    {
        path: "sign",
        loadChildren:() => import('src/app/pages/sign/sign.module').then(m=>m.SignModule)
    }
];
