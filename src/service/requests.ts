import { api } from "@/plugins/axios";
import { Id } from "@/service/types";

export interface Repository {
  fetch: (params: any) => Promise<any>;
  create: (params: any) => Promise<any>;
  update: <Response, P>(params: P) => Promise<any>;
  remove: (id: Id) => Promise<any>;
}

export default class Requests implements Repository {
  protected url: string;
  protected http = api;

  constructor(url: string) {
    this.url = url;
  }

  fetch<Response>(params: any = {}) {
    return this.http.request<Response>({
      method: "get",
      url: this.url,
      params,
    });
  }
  create<Response>(params: any = {}) {
    return this.http.request<Response>({
      method: "post",
      url: this.url,
      params,
    });
  }
  update<Response, P>(params: P) {
    return this.http.request<Response>({
      method: "patch",
      url: this.url,
      params,
    });
  }
  remove<Response>(id: Id) {
    return this.http.request<Response>({
      method: "patch",
      url: `${this.url}/${id}`,
    });
  }
}
