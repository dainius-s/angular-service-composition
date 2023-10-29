import { map } from 'rxjs/operators';
import { HttpClient}  from '@angular/common/http';
import { StoreConfig, WithId } from '@models';
import { Directive } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreArrayService } from '@shared/store/base';


@Directive()
export abstract class CreateStoreArray<T extends WithId> extends StoreArrayService<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T[]>,
  ) {
    super(http, config);
  }

  create$(item: T): Observable<T> {
    // return this.http.post<WithId>(this.url, item)
    // uncomment code above and remove code below to see how it works with http request
    return of(item)
      .pipe(
        map((response: T) => {
          const created = {...item, ...response};
          const newState = [...this.getState(), created];
          this.setState(newState);

          return created;
        }),
      );
  }
}
