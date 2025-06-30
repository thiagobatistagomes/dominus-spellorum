import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: "auth",
        children: [
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "login",
                component: LoginComponent
            }
        ]
    },
];
