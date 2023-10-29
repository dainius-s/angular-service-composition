import { Injectable } from '@angular/core';
import { applyMixins } from '@shared/helpers';
import {CreateStoreItem, DeleteStoreItem, UpdateStoreItem} from '@shared/store/features';
import { Apple } from '@models';
import { HttpClient } from '@angular/common/http';
import {StoreItemService} from '@shared/store/base/store-item.service';

@Injectable()
export class AppleService extends StoreItemService<Apple> {
  constructor(http: HttpClient) {
    super(http, { path: 'apple' });
  }
}

export interface AppleService extends
  CreateStoreItem<Apple>,
  UpdateStoreItem<Apple>,
  DeleteStoreItem<Apple>
{}

applyMixins(AppleService, [
  CreateStoreItem,
  UpdateStoreItem,
  DeleteStoreItem,
]);
