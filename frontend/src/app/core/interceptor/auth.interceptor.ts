import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const rotasPublicas = ['/auth/login', '/auth/register'];

  if (rotasPublicas.some(r => req.url.includes(r))) {
    return next(req);
  }

  
  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(authReq);
};

