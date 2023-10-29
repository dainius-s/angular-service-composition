import { switchMap, take } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient}  from '@angular/common/http';
import { StoreService } from '@shared/store/base/store.service';
import { StoreConfig } from '@models';
import { Directive } from '@angular/core';
import {Observable, of} from 'rxjs';

@Directive()
export abstract class StoreItemService<T> extends StoreService<T> implements Resolve<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T>,
  ) {

    super(http, config);
  }

  get$(): Observable<T> {
    if (this.getState() === undefined) {
      // return this.http.get<T>(this.url)
      // uncomment code above and remove code below to see how it works with http request
      return of()
        .pipe(
          switchMap((response) => {
            this.setState(response);
            return this.store$.asObservable();
          }),
        );
    }

    return this.store$.asObservable();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    return this.get$().pipe(take(1));
  }
}
