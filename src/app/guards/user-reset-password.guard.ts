import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {JwtService} from "../service/jwt.service";

export const userResetPasswordGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router); // Correctly access Router
  const token = sessionStorage.getItem("jwt");

  if(!token) return true;

  if(jwtService.isTokenFormatValid(token)) {
    router.navigate(['/welcome']);
    return false; // Prevent navigation to the login page
  } else {
    return true;
  }
};
