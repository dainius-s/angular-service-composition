import { map } from 'rxjs/operators';
import { HttpClient}  from '@angular/common/http';
import { StoreConfig, WithId } from '@models';
import { Directive } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreArrayService } from '@shared/store/base';


@Directive()
export abstract class DeleteStoreArray<T extends WithId> extends StoreArrayService<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T[]>,
  ) {
    super(http, config);
  }

  delete$(id: number): Observable<void> {
    // return this.http.delete(`${this.url}/${id}`)
    // uncomment code above and remove code below to see how it works with http request
    return of(undefined)
      .pipe(
        map(() => {
          const state = this.getState();
          const filtered = state.filter(v => v.id !== id);
          this.setState(filtered);
        }),
      );
  }
}
