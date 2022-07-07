import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../types/user.type';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$!: Observable<User | null>;
  currentUser: User | null = null;
  isLoggedIn$: Observable<boolean>;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone
  ) {
    // listen to auth changes
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user as User;
      } else {
        localStorage.setItem('user', 'null');
        this.currentUser = null;
      }
    });

    this.isLoggedIn$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        const res =
          user !== null && user.emailVerified !== false ? true : false;
        return of(res);
      })
    );
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  async GoogleAuth() {
    const res = await this.AuthLogin(new auth.GoogleAuthProvider());
    if (res) {
      this.router.navigate(['']);
    }
  }

  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  private async AuthLogin(provider: auth.GoogleAuthProvider) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
      this.SetUserData(result.user);
      return result.user;
    } catch (error) {
      window.alert(error);
      return null;
    }
  }

  private SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
}
