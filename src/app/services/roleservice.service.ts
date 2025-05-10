// src/app/auth/role.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**  ← VERVANG door de namespace die je in je Auth0-Action hebt gebruikt */
const NAMESPACE = 'https://example.com/claims/roles';

@Injectable({ providedIn: 'root' })
export class RoleService {
  /** Stream met alle rollen uit het ID-token */
  roles$: Observable<string[]>;

  constructor(private auth: AuthService) {
    this.roles$ = this.auth.idTokenClaims$.pipe(
      map(claims => (claims?.[NAMESPACE] as string[]) || [])
    );
  }

  /** Synchronous helper (niet reactief, maar soms handig in templates) */
  has(role: string): Observable<boolean> {
    return this.roles$.pipe(map(r => r.includes(role)));
  }
}
