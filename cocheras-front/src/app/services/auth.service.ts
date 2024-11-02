import { Injectable } from '@angular/core';
import { DatosLogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Logout() {
    throw new Error('Method not implemented.');
  }

  login(datosLogin: DatosLogin) {
    return fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(datosLogin),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => r.json())
    .then(response => {
      if (response.status === 'ok') {
        localStorage.setItem('token', response.token);
        return true;
      } else {
        return false;
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
