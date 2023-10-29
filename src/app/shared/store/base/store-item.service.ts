import { first, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient}  from '@angular/common/http';
import { StoreService } from '@shared/store/base/store.service';
import { StoreConfig } from '@models';
import { Directive } from '@angular/core';
import { Observable, of } from 'rxjs';

@Directive()
export abstract class StoreItemService<T> extends StoreService<T | undefined> implements Resolve<T> {

  protected constructor(
    http: HttpClient,
    config: StoreConfig<T | undefined>,
  ) {

    super(http, config);
  }

  get$(): Observable<T | undefined> {
    if (this.getState() === undefined) {
      // return this.http.get<T>(this.url)
      // uncomment code above and remove code below to see how it works with http request
      return of(undefined)
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
    // @ts-ignore
    return this.get$().pipe(first(v => v !== undefined));
  }
}
