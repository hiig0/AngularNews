import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    router.navigate(['/tabs']);
  }

  return true;
};
