import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import {Transferblood} from './transferblood';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {Headers, Http} from '@angular/http';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Observable} from 'rxjs/Observable';
import {Staff} from '../../user/staff/staff';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';

@Injectable()
export class TransferbloodService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });

  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http, private authservice: AuthenticateService, private bloodstockservice: BloodstockService ) { }

  getTransfer(): Observable<Transferblood[]> {
    // const url = this.serverUrl + '/donationcenters';
    const url = 'http://localhost:3000/api/transfers';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getBlood(bloodstock: Bloodstock): Observable< Bloodstock[]> {
    const branch = this.authservice.getCurrentUser().branchid;
    const url = this.serverUrl + '/branches/' + branch + '/stocks/' + bloodstock.id;
    return this.http.put(url, bloodstock, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });

  }
  askBlood(transferblood: Transferblood): Observable<any> {
    const  url = this.serverUrl + '/transfers';
    return this.http.post(url, transferblood, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  provideBlood(tf: Transferblood): Observable<any> {
    const  url = this.serverUrl + '/transfers/' + tf.id;
    return this.http.put(url, tf, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  getSpecificTransfer(amount: number, status: boolean ): Observable<Transferblood[]> {
    const  url = this.serverUrl + '/transfers?filter={"where":{"requestedamount":"' + amount + '","status":"' + status + '"}}';
    // const  url = this.serverUrl + '/transfers?filter={"where": { "and": [{"and": [{"requestedamount": "' + amount + '"}, ' +
    //   '{"status": "' + status + '"}]},{"and": [{"requestedamount": "' + amount + '"}, ' +
    //   '{"status": "' + status + '"}]}]}} ';

    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  // getSpecificTransfer(req: String, prov: String , type: String, amount: number, status: boolean ): Observable<Transferblood[]> {
  //   // reqid: String, amt: number, type: String
  //   // const provid = this.authservice.getCurrentUser().branchid;
  //   // const branch = this.authservice.getCurrentUser().branchid;
  //   // const  url = this.serverUrl + '/transfers?filter={"where":{"amount":"' + amount + '"}}';
  //   // const  url = this.serverUrl + '/transfers?filter={"where":{"or":[{"requestbranchid":"' + req + '"},{"providerbranchid":"' + prov + '"} ]}}';
  //   // const  url = this.serverUrl + '/transfers?filter={"where":{"and":[{"requestedamount":"' + amount + '"},{"status":"' + status + '"} ' +
  //   //   ',{"type":"A+"} ]}}';
  //   const  url = this.serverUrl + '/transfers?filter={"where":{"requestedamount":"' + amount + '","status":"' + status + '"}}';
  //   // const  url = this.serverUrl + '/transfers?filter={"where": { "and": [{"and": [{"requestedamount": "' + amount + '"}, ' +
  //   //   '{"status": "' + status + '"}]},{"and": [{"requestedamount": "' + amount + '"}, ' +
  //   //   '{"status": "' + status + '"}]}]}} ';
  //
  //   return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
  //     return Observable.throw(err);
  //   });
  // }
  cancelRequest(id: String): Observable<Transferblood[]> {
    const  url = this.serverUrl + '/transfers/' + id;
    return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  // transferDetail
  bloodTransaction(transferblood: Transferblood, id: String): Observable<any> {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/transfers/' + id;
    return this.http.put(url, transferblood, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }


}
