import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Credentials } from '../../shared/index';

export class AuthException {
  name = 'AuthException';
}

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  isAuthenticated() {
    return this.afAuth.authState.pipe(
      map(data => {
        if (data) {
          return data;
        }
        throw new AuthException();
      })
    );
  }

  login(credentials: Credentials) {
    return Observable.fromPromise(
      this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  logout() {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  resetPassword(email: string) {
    return Observable.fromPromise(
      this.afAuth.auth.sendPasswordResetEmail(email)
    );
  }

  verifyOnReset(code: string) {
    return Observable.fromPromise(this.afAuth.auth.verifyPasswordResetCode(code));
  }

  confirmPasswordReset(code: string, newPassword: string) {
    return Observable.fromPromise(
      this.afAuth.auth.confirmPasswordReset(code, newPassword)
    );
  }
}
