import { set, update } from "@/helpers/mutations";

export class Storage<T extends object> {
  state: T;
  constructor(state: T) {
    this.state = state;
  }

  set(state: T): T {
    this.state = state;
    return this.state;
  }
  update(state: Partial<T>): void {
    update(this.state, state);
  }
  setByKey(key: keyof T, value: any): void {
    set(this.state, key, value);
  }
}
