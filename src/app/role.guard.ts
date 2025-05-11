import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from './services/roleservice.service';
import { map, tap } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = inject(RoleService);
  const router = inject(Router);
  const requiredRoles = route.data?.['roles'] as string[] || [];
  
  return roles.roles$.pipe(
    map(userRoles => {
      // Check if user has at least one of the required roles
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      if (!hasRequiredRole) {
        router.navigate(['/']);
      }
      return hasRequiredRole;
    })
  );
};