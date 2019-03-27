import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { Empresa } from '../../model/empresa.model';

@Injectable()
export class EmpresaService extends RestService {

  baseURL = Constant.BASE_URL + Constant.EMPRESA;

  constructor(
    http: Http
  ) { super(http); }

  public getOne(id: String): Observable<Empresa> {
    const getAllUrl = this.baseURL + '?cdtri=' + id;
    return this.get(getAllUrl);
  }

}
