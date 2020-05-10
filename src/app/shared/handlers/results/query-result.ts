export interface IQueryResult<Type> {
    data: Type;
    message: string;
    totalRows: number;
}