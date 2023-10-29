export interface StoreConfig<T> {
  readonly path: string,
  readonly defaultState?: T,
}
