import { AnnouncementSelectList } from './view-models/announcement-select-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';

export class ListAnnouncementSelectList implements IQuery<AnnouncementSelectList[]> {
    includeReserved: boolean;

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<AnnouncementSelectList[]>> {
        return http.get<IQueryResult<AnnouncementSelectList[]>>(`${apiUrl}/announcements/select`);
    }
}