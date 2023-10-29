import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StoreConfig} from '@models';
import {Directive} from '@angular/core';
import {environment} from '@environment';
import urlJoin from 'url-join';

@Directive()
export abstract class StoreService<T> {
  protected store$: BehaviorSubject<T>;
  protected readonly url: string;

  protected constructor(
    protected http: HttpClient,
    protected readonly config: StoreConfig<T>,
  ) {
    const {
      path,
      defaultState = null,
    } = config;

    this.url = urlJoin(environment.apiUrl, path);
    this.store$ = new BehaviorSubject<T>(defaultState as T);
  }

  protected setState(state: T): void {
    this.store$.next(state);
  }

  protected getState(): T {
    return this.store$.value;
  }
}
