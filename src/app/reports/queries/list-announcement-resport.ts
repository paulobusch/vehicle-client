import { AnnouncementReportList } from './view-models/announcement-report-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { toUrl } from 'src/app/shared/content/to-url';
import { Observable } from 'rxjs';

export class ListAnnouncementReport implements IQuery<AnnouncementReportList[]> {
    public startDate?: Date;
    public endDate?: Date;

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<AnnouncementReportList[]>> {
        return http.get<IQueryResult<AnnouncementReportList[]>>(`${apiUrl}/announcements/report?${toUrl(this)}`);
    }
}