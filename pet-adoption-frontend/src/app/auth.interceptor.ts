import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// Define the AuthInterceptor function
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(authReq);
};
