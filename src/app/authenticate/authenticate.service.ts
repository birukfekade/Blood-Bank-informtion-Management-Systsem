import { Injectable } from '@angular/core';
import {Http,  Headers} from '@angular/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {Staff} from '../user/staff/staff';

@Injectable()
export class AuthenticateService {

  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.getToken()
  });

  serverUrl = 'http://localhost:3000/api';
  constructor( private  http: Http) {

  }

  login(username: string, password: string): Observable <any> {
    this.headers.delete('Authorization');
    const url = this.serverUrl + '/accounts/login?include=user';
    return this.http.post(url, {username: username, password: password}, {headers: this.headers}).map(res => res.json()).catch(err =>{
      return Observable.throw(err);
    });
  }

changePassword(oldPassword: string , newPassword: string) {
  const url = this.serverUrl + '/accounts/change-password';
  return this.http.post(url, { userId: this.getCurrentUser().id, oldPassword: oldPassword, newPassword: newPassword}, {headers: this.headers}).map(res => res.json()).catch(err =>{
    return Observable.throw(err);
  });

}
  register(user: User): Observable <any> {
    const url = this.serverUrl + '/accounts';
    // this.headers.delete('Authorization');
    return this.http.post(url, user,  {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  updateUser(ur: User): Observable<any> {
    const  url = this.serverUrl + '/accounts/' + ur.id;
    return this.http.put(url, ur,  { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }


  setUser(user: User) {
    const userString = JSON.stringify(user);
    localStorage.setItem('CurrentUser', userString);
  }

  getSpecificUserId(): Observable<User> {
    const  url = this.serverUrl + '/accounts';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  getCurrentUser(): User {
    const userString = localStorage.getItem('CurrentUser');
    if (!isNullOrUndefined(userString)) {
      const user: User = JSON.parse(userString);
      return user;
    }   else {
      return null;

    }
  return null;
  }
  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  getToken(): string {
    return  localStorage.getItem('accessToken');
  }


  logout(): Observable<any> {
    const url = this.serverUrl + '/accounts/logout';
const data = {accessTokenID: this.getToken()};
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('accessToken');
return  this.http.post(url, data, {headers: this.headers}).map(res => res.json()).catch(err => {
  return  Observable.throw(err);
});


  }



//   logout(): Observable<any> {
// const url = this.serverUrl + 'Users/logout';
// const data = {accessTokenId: this.getToken()};
//
// return  this.http.post(url, data, {headers: this.headers}).map(res => res.json()).catch(err =>{
//   return  Observable.throw(err);
//   localStorage.removeItem('CurrentUser');
//   localStorage.removeItem('accessToken');
// });

  // }


}
