import { set, update } from "@/helpers/mutations";
import { reactive, UnwrapRef } from "vue";

interface IState<DTO> {
  state: DTO;
}

export class Storage<T extends object> {
  readonly observer: IState<UnwrapRef<T>>;
  state: UnwrapRef<T>;
  constructor(initialState: T) {
    this.observer = reactive({ state: initialState });
    this.state = this.observer.state;
  }

  get(): UnwrapRef<T> {
    return this.state;
  }
  set(state: UnwrapRef<T>): UnwrapRef<T> {
    this.state = state;
    return this.state;
  }
  update(state: Partial<UnwrapRef<T>>): void {
    update(this.state, state);
  }
  setByKey(key: keyof UnwrapRef<T>, value: any): void {
    set(this.state, key, value);
  }
}
