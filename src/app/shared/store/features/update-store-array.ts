 import { map } from 'rxjs/operators';
import { HttpClient}  from '@angular/common/http';
import { StoreConfig, WithId } from '@models';
import { Directive } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreArrayService } from '@shared/store/base';


@Directive()
export abstract class UpdateStoreArray<T extends WithId> extends StoreArrayService<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T[]>,
  ) {
    super(http, config);
  }

  update$(item: T): Observable<T> {
    // return this.http.put(this.url, item)
    // uncomment code above and remove code below to see how it works with http request
    return of(item)
      .pipe(
        map(() => {
          const state = this.getState();
          const updated = state.map(v => v.id === item.id ? { ...v, ...item } : v);
          this.setState(updated);

          return item;
        }),
      );
  }
}
