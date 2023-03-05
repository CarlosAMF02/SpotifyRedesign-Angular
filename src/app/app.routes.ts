import { Routes } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";

export const AppRoutes: Routes =[
    {
        path: '',
        redirectTo: 'player/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
    },
    {
        path: 'player',
        canLoad: [AuthenticationGuard],
        loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule)
    }
]