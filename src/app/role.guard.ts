// src/app/auth/role.guard.ts
import { inject } from '@angular/core';
import { RoleService } from './services/roleservice.service';
import { map } from 'rxjs/operators';
import { CanMatchFn } from '@angular/router';

export const roleGuard =
  (allowed: string[]): CanMatchFn =>
  () => inject(RoleService).roles$.pipe(
    map(roles => roles.some(r => allowed.includes(r)))
  );
