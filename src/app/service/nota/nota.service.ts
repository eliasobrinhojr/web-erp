import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { Nota } from '../../model/nota.model';

@Injectable()
export class NotaService extends RestService {

    baseURL = Constant.BASE_URL + Constant.NOTA;

    constructor(
        http: Http
    ) { super(http); }

    public getAllNotasPorEmpresa(cdtri: String, periodoDe: string, periodoAte: string): Observable<Nota[]> {
        const getAllUrl = this.baseURL + '?cdtri=' + cdtri + '&de=' + periodoDe + '&ate=' + periodoAte;
        return this.get(getAllUrl);
    }

}