import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ReportService {
    constructor(
        private apiService: ApiService
    ) { }


    getSystemTypes(): Observable<any> {
        return this.apiService.post('system/systemTypes', {} )
            .pipe(map(data => data));
    }

    getSystems(systemTypeId: any): Observable<any> {
        return this.apiService.post('system/systems', { systemTypeId } )
            .pipe(map(data => data));
    }

    downloadSystemsReport(systemIds: Array<number>, startDate: string, endDate: string): Observable<any> {
        return this.apiService.download('system/report/files', {systemIds, startDate, endDate} )
            .pipe(map(data => data));
    }

    getHistoryReports(): Observable<any> {
        return this.apiService.post('system/report/reports', {} )
            .pipe(map(data => data));
    }

    downloadHistoryReport(fileName: string, filePath: string): Observable<any> {
        return this.apiService.download('system/file/download', {fileName, filePath} )
            .pipe(map(data => data));
    }
}
