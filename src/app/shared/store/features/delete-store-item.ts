import { map } from 'rxjs/operators';
import { HttpClient}  from '@angular/common/http';
import { StoreConfig, WithId } from '@models';
import { Directive } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreItemService } from '@shared/store/base/store-item.service';


@Directive()
export abstract class DeleteStoreItem<T extends WithId> extends StoreItemService<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T>,
  ) {
    super(http, config);
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
