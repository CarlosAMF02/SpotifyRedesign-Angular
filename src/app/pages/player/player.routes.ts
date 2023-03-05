import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/components/home/home.component";
import { PlayerComponent } from "./player.component";

export const PlayerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            }
        ],
    },
]