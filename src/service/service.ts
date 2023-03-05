import Requests from "@/service/requests";
import { Id, Item } from "@/service/types";

import { Storage } from "@/service/storage";
import { addToList, removeFromList, replaceInList } from "@/helpers/mutations";
import { keyBy, map } from "lodash-es";

interface ICollection<DTO> {
  list: DTO[];
}

interface IResEntity<DTO> {
  data: DTO;
}

interface IResEntities<DTO> {
  data: DTO[];
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
  async update(data: Partial<DTO>): Promise<any> {
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

  get state(): C {
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

  setList(list: DTO[]): void {
    this.storage.setByKey("list", list);
  }
  addItem(item: DTO): void {
    addToList(this.storage.state.list, item);
  }
  removeItem(item: DTO) {
    removeFromList(this.storage.state.list, item);
  }
  replaceItem(item: DTO) {
    replaceInList(this.storage.state.list, item);
  }
}
