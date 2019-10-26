import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupsService {
    constructor(
        private apiService: ApiService
    ) { }

    getGroupLists(): Observable<any> {
        return this.apiService.post('group/groupList', {} )
            .pipe(map(data => data));
    }

    getHistoricalTrend(groupIds: Array<number>): Observable<any> {
       
        return this.apiService.post('group/productivity', { groupIds } )
        .pipe(map(data => data));
    }

    getOverallUtilizationBar(groupIds: Array<number>): Observable<any> {
        return this.apiService.post('system/utilization/line', { groupIds } )
            .pipe(map(data => data));
    }

    getOverallUtilizationPie(groupIds: Array<number>): Observable<any> {
        return this.apiService.post('system/utilization/pie', { groupIds } )
            .pipe(map(data => data));
    }

}
