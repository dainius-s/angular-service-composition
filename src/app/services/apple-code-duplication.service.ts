import { Injectable } from '@angular/core';
import { applyMixins } from '@shared/helpers';
import {CreateStoreItem, DeleteStoreItem, UpdateStoreItem} from '@shared/store/features';
import { Apple } from '@models';
import { HttpClient } from '@angular/common/http';
import {StoreItemService} from '@shared/store/base/store-item.service';
import {StoreService} from '@shared/store/base';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AppleService extends StoreService<Apple> {
  constructor(http: HttpClient) {
    super(http, { path: 'apple' });
  }

  create$(item: Apple): Observable<Apple> {
    // return this.http.post<WithId>(this.url, item)
    // uncomment code above and remove code below to see how it works with http request
    return of(item)
      .pipe(
        map((response: Apple) => {
          const created = {...item, ...response};
          this.setState(created);

          return created;
        }),
      );
  }

  update$(item: Apple): Observable<Apple> {
    // return this.http.put(this.url, item)
    // uncomment code above and remove code below to see how it works with http request
    return of(item)
      .pipe(
        map(() => {
          const updated = {...item};
          this.setState(updated);

          return updated;
        }),
      );
  }

  delete$(): Observable<void> {
    // return this.http.delete(`${this.url}/${id}`)
    // uncomment code above and remove code below to see how it works with http request
    return of(undefined)
      .pipe(
        map(() => {
          // @ts-ignore
          this.setState(undefined);
        }),
      );
  }
}
