import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from './user.types';
import {environment} from '../../../environments/environment';
import {CustomResponse} from '../../shared/interfaces/common.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = environment.serverApi;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {
  }

  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged in user data
   */
  get(): Observable<User> {
    return this._httpClient.get<User>(`${this._url}/api/auth/me/`).pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  /**
   * Update the user
   *
   * @param params
   */
  edit(params: any): Observable<User> {
    return this._httpClient.get<User>(`${this._url}/api/auth/edit_data/`, {params}).pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  /**
   * Change user password
   *
   * @param params
   */
  changePassword(params: any): Observable<CustomResponse> {
    return this._httpClient.options<CustomResponse>(`${this._url}/api/auth/change_password/`, {params});
  }
}
