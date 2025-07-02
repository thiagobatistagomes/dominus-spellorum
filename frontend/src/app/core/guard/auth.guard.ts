import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authToken = localStorage.getItem('token');

  const rotasPublicas = ['/auth/login', '/auth/register', '/'];
  const rotaSolicitada = state.url;

  if (authToken) {
    if (rotasPublicas.includes(rotaSolicitada)) {
      router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  } else {
    if (rotasPublicas.includes(rotaSolicitada)) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  }
};
