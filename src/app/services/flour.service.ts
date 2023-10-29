import { Injectable } from '@angular/core';
import { applyMixins } from '@shared/helpers';
import { StoreArrayService } from '@shared/store/base';
import { Flour } from '@models';
import { HttpClient } from '@angular/common/http';
import {CreateStoreArray, DeleteStoreArray, UpdateStoreArray} from '@shared/store/features';

@Injectable()
export class FlourService extends StoreArrayService<Flour> {
  constructor(http: HttpClient) {
    super(http, { path: 'flour' });
  }
}

export interface FlourService extends
  CreateStoreArray<Flour>,
  UpdateStoreArray<Flour>,
  DeleteStoreArray<Flour>
{}

applyMixins(FlourService, [
  CreateStoreArray,
  UpdateStoreArray,
  DeleteStoreArray,
]);
