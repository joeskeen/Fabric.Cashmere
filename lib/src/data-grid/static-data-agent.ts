import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class StaticDataAgent<T> implements IDataAgent<T> {
    constructor(private data: T[]) {
    }

    fetch(query: IDataQuery): Observable<T[]> {
        query = query || {};
        let data = Array.isArray(this.data) ? this.data : [];
        if (query.filter) {
            data = data.filter(o => this.matchesFilter(o, (query.filter as string).toString()));
        }
        if (query.sortBy) {
            const sort = query.sortBy;
            const modifier = query.sortDirection === SortDirection.Descending ? -1 : 1;
            data = data.sort((a, b) => {
                let valueA = a[sort];
                let valueB = b[sort];
                if (typeof(valueA) === 'number' && typeof(valueB) === 'number') {
                    return (valueA - valueB) * modifier;
                }
                if (valueA instanceof Date && valueB instanceof Date) {
                    return (valueA.getTime() - valueB.getTime()) * modifier;
                }
                return (a[sort] as string || '').toString()
                    .localeCompare((b[sort] as string || '').toString())
                    * modifier;
            });
        }
        const pageSize = query.pageSize || 10;
        const startIndex = ((query.page || 1) - 1) * pageSize;
        const page = data.slice(startIndex, startIndex + pageSize);
        return Observable.of(page);
    }

    private matchesFilter(obj: T, filter: string): boolean {
        return Object.keys(obj || {})
            .some(k => ((obj || {})[k] as string || '')
                .toString()
                .toLowerCase()
                .includes(filter.toLowerCase()));
    }
}

export interface IDataAgent<T> {
    fetch(query: IDataQuery): Observable<T[]>;
}

export interface IDataQuery {
    filter?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: SortDirection;
}

export enum SortDirection {
    Ascending,
    Descending
}
