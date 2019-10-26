import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SystemService {
    constructor(
        private apiService: ApiService
    ) { }


    getSystemInfor(systemId: any): Observable<any> {
        return this.apiService.post('system/detail', { systemId } )
            .pipe(map(data => data));
    }

    /* getSystemProductivity(groupIds: Array<number>, systemId: any): Observable<any> {
        return this.apiService.post('group/productivity', { groupIds } )
            .pipe(map(data => data));
    } */

    getSystemUtilizationPie(groupIds: Array<number>, systemId: any): Observable<any> {
        return this.apiService.post('system/utilization/pie', { groupIds, systemId } )
            .pipe(map(data => data));
    }

    getSystemUtilizationBar(groupIds: Array<number>, systemId: any): Observable<any> {
        return this.apiService.post('system/utilization/line', { groupIds, systemId } )
            .pipe(map(data => data));
    }

    getSystemLatestStates(systemId: any): Observable<any> {
        return this.apiService.post('system/latestState', { systemId } )
            .pipe(map(data => data));
    }

    getSystemProductivity(groupIds: Array<number>, systemId: any): Observable<any> {
        return this.apiService.post('system/productivity', { systemId } )
            .pipe(map(data => data));
    }

    getSystemProductivity30Average(groupIds: Array<number>, systemId: any): Observable<any> {
        return this.apiService.post('system/productivity/30-average', { systemId } )
            .pipe(map(data => data));
    }

}
