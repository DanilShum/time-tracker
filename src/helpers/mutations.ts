import { isEqual } from "lodash-es";
import { Item } from "@/service/types";

export const set = <S, K extends keyof S>(
  state: S,
  key: K,
  value: any
): void => {
  state[key] = value;
};

export const update = <S extends object>(
  state: S,
  updatedState: Partial<S>
): void => {
  for (const key in updatedState) {
    if (!isEqual(state[key], updatedState[key])) {
      state[key] = updatedState[key] as S[typeof key];
    }
  }
};

export const addToList = <L extends I[], I>(list: L, item: I) =>
  list.push(item);

export const removeFromList = <L extends I[], I extends Item>(
  list: L,
  item: I
): void => {
  const index = list.findIndex((el) => el.id === item.id);
  if (index >= 0) {
    list.splice(index, 1);
  }
};

export const replaceInList = <L extends I[], I extends Item>(
  list: L,
  item: I
) => {
  const index = list.findIndex((el) => el.id === item.id);
  if (index >= 0) {
    list.splice(index, 1, item);
  }
};
