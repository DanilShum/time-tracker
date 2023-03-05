import {
  addToList,
  removeFromList,
  replaceInList,
  set,
} from "@/helpers/mutations";
import { keyBy, map } from "lodash-es";
import Requests from "@/service/requests";
import { Item, Id } from "@/service/types";

interface IState<I> {
  list: I[];
  loading: boolean;
}

interface IActions<I> {
  fetch: (params: any) => any;
  addItem: (item: I) => any;
  removeItem: (item: I) => void;
  replaceItem: (item: I) => void;
}

interface IGetters<I> {
  itemById: { [index: string]: I };
  ids: Id[];
}
export default class EntityStore<I extends Item> {
  state: IState<I>;
  actions: IActions<I>;
  getters: IGetters<I>;
  requests: Requests;

  constructor(url: string) {
    this.requests = new Requests(url);

    this.state = {
      list: [],
      loading: false,
    };

    this.actions = {
      fetch: async (params) => {
        const data = await this.requests.fetch(params);
        set(this.state, "list", data);

        return data;
      },
      addItem: (item) => {
        addToList(this.state.list, item);
      },
      removeItem: (item) => {
        removeFromList(this.state.list, item);
      },
      replaceItem: (item) => {
        replaceInList(this.state.list, item);
      },
    };

    this.getters = {
      itemById: keyBy(this.state.list, "id"),
      ids: map(this.state.list, "id"),
    };
  }
}
