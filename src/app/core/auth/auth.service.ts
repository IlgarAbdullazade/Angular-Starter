import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {SignInModel, SignUpModel} from './auth.types';
import {environment} from '../../../environments/environment';


@Injectable()
export class AuthService {
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _url = environment.serverApi;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  /**
   * Setter & Getter for auth
   */

  set authenticated(value: boolean) {
    // Store the value
    this._authenticated.next(value);
  }

  get authenticated$(): Observable<boolean> {
    return this._authenticated.asObservable();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post(`${this._url}/api/auth/forgot-password/`, email);
  }


  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: SignInModel): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated.value) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(`${this._url}/api/auth/login/`, credentials).pipe(
      switchMap((response: any) => {

        // Store the access token in the local storage
        this.accessToken = response.access_token;

        // Store the user on the user service
        this._userService.user = response.user;

        // Set the authenticated flag to true
        this.authenticated = true;

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient.post(`${this._url}/api/auth/refresh_token/`, null).pipe(
      catchError(() =>

        // Return false
        of(false)
      ),
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.access_token;

        // Store the user on the user service
        this._userService.user = response.user;

        // Set the authenticated flag to true
        this.authenticated = response;

        // Return true
        return of(response);
      })
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this.authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: SignUpModel): Observable<any> {
    return this._httpClient.post(`${this._url}/api/auth/sign_up/`, user).pipe(
      switchMap((response: any) => {

        // Store the access token in the local storage
        this.accessToken = response.access_token;

        // Store the user on the user service
        this._userService.user = response.user;

        // Set the authenticated flag to true
        this.authenticated = true;

        // Return a new observable with the response
        return of(response);
      })
    );
  }


  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated.value) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken || this.accessToken === 'undefined') {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
