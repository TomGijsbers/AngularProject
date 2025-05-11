import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'events', 
    loadComponent: () => import('./events/events.component').then(m => m.EventsComponent)
  },
  // { 
  //   path: 'events/mine', 
  //   loadComponent: () => import('./events/my-events/my-events.component').then(m => m.MyEventsComponent),
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: ['TeamLeader', 'eventAdmin'] }
  // },
  // { 
  //   path: 'events/new', 
  //   loadComponent: () => import('./events/new-event/new-event.component').then(m => m.NewEventComponent),
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: ['TeamLeader', 'eventAdmin'] }
  // },
  // { 
  //   path: 'admin/users', 
  //   loadComponent: () => import('./admin/users/users.component').then(m => m.UsersComponent),
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: ['eventAdmin'] }
  // },
  // { 
  //   path: 'admin/events', 
  //   loadComponent: () => import('./admin/events/events.component').then(m => m.EventsComponent),
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: ['eventAdmin'] }
  // },
  { path: '**', redirectTo: '' }
];