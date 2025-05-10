// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { TestComponent } from './test.component';
import { HomeComponent } from './home/home.component';

import { roleGuard } from './role.guard';   // 👈 import

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'events', component: EventsComponent },              // publiek

  // sub-routes (stand-alone of child-routes)
  { path: 'events/', component: EventsComponent,
    canMatch: [roleGuard(['TeamLeader', 'eventAdmin'])] },

  { path: 'events/new', component: EventsComponent,
    canMatch: [roleGuard(['TeamLeader', 'eventAdmin'])] },

  { path: 'profile', component: ProfileComponent,
    canMatch: [roleGuard(['User','TeamLeader','eventAdmin'])] },

  /* Admin-section (kan ook lazy module zijn) */
//   { path: 'admin', canMatch: [roleGuard(['eventAdmin'])],
//     children: [
//       { path: '', component: AdminHomeComponent },
//       { path: 'users', component: AdminUsersComponent },
//       { path: 'events', component: AdminEventsComponent }
//     ]
//   },

  { path: '**', redirectTo: '' }
];

