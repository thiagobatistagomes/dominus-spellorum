import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth.guard';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';
import { EditarComponent } from './pages/editar/editar.component';


export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: "auth",
        canActivate: [authGuard],
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
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: "adicionar",
        component: AdicionarComponent,
        canActivate: [authGuard]
    },
    {
        path: "editar",
        component: EditarComponent,
        canActivate: [authGuard]
    }
];
