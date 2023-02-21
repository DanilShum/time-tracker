import Requests from "@/service/requests";
import { Id, Item } from "@/service/types";
import { UnwrapRef } from "vue";

import { Storage } from "@/service/storage";
import { addToList, removeFromList, replaceInList } from "@/helpers/mutations";
import { keyBy, map } from "lodash-es";

// TODO Выпилить файлик entity.js

interface ICollection<DTO> {
  list: UnwrapRef<DTO[]>;
}

interface IResEntity<DTO> {
  data: UnwrapRef<DTO>;
}

interface IResEntities<DTO> {
  data: UnwrapRef<DTO[]>;
}

export class Service<DTO extends object> {
  protected storage: Storage<DTO>;
  protected requests: Requests;

  constructor(entity: string, data: DTO) {
    this.requests = new Requests(entity);
    this.storage = new Storage(data);
  }

  async fetch(): Promise<any> {
    const { data }: IResEntity<DTO> = await this.requests.fetch();
    this.storage.set(data);
    return data;
  }
  async update(data: Partial<UnwrapRef<DTO>>): Promise<any> {
    const res = await this.requests.update(data);
    this.storage.update(data);

    return res;
  }
  async remove(id: Id): Promise<any> {
    return await this.requests.remove(id);
  }
}

export class ServiceCollection<DTO extends Item, C extends ICollection<DTO>> {
  protected storage: Storage<C>;
  protected requests: Requests;

  constructor(entity: string, data: C) {
    this.requests = new Requests(entity);
    this.storage = new Storage(data);
  }

  get state(): UnwrapRef<C> {
    return this.storage.state;
  }

  get list() {
    return this.state.list;
  }

  get itemById() {
    return keyBy(this.list, "id");
  }
  get ids() {
    return map(this.list, "id");
  }

  async fetch() {
    const { data }: IResEntities<DTO> = await this.requests.fetch();
    this.setList(data);
    return data;
  }

  setList(list: UnwrapRef<DTO[]>): void {
    this.storage.setByKey("list", list);
  }
  addItem(item: UnwrapRef<DTO>): void {
    addToList(this.storage.state.list, item as typeof this.list[0]);
  }
  removeItem(item: UnwrapRef<DTO>) {
    removeFromList(this.storage.state.list, item as typeof this.list[0]);
  }
  replaceItem(item: UnwrapRef<DTO>) {
    replaceInList(this.storage.state.list, item as typeof this.list[0]);
  }
}
