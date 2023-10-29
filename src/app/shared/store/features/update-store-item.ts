import { map } from 'rxjs/operators';
import { HttpClient}  from '@angular/common/http';
import { StoreConfig, WithId } from '@models';
import { Directive } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreItemService } from '@shared/store/base/store-item.service';


@Directive()
export abstract class UpdateStoreItem<T extends WithId> extends StoreItemService<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T>,
  ) {
    super(http, config);
  }

  update$(item: T): Observable<T> {
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
}
