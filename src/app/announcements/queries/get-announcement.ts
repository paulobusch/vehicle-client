import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { AnnouncementDetail } from './view-models/announcement-detail';
import { Observable } from 'rxjs';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { HttpClient } from '@angular/common/http';

export class GetAnnouncement implements IQuery<AnnouncementDetail> {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<AnnouncementDetail>> {
        return http.get<IQueryResult<AnnouncementDetail>>(`${apiUrl}/announcements/${this.id}`);
    }
}