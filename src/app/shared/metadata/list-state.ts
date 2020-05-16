import { IQueryResult } from '../handlers/results/query-result';

export class ListState {
    get done(): boolean { return !this.loading && !this.noItems; }
    public loading: boolean;
    public totalRows: number;
    public noItems: boolean;

    public reset() {
        this.noItems = false;
        this.loading = true;
    }

    public loaded<T>(result: IQueryResult<T>) {
        this.loading = false;
        this.totalRows = result.totalRows;
        this.noItems = result.totalRows === 0;
    }
}
