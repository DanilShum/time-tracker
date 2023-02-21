import { Service, ServiceCollection } from "@/service/service";

interface IUser {
  readonly id: string | number;
  name: string;
  created_at: Date | string;
  isActive: boolean;
  email: string;
}

interface IUsers {
  list: IUser[];
  loading: boolean;
  param: string;
}

export class userService extends Service<IUser> {
  constructor() {
    super("user", {
      id: "",
      name: "",
      created_at: "",
      isActive: false,
      email: "",
    });
  }

  get user(): IUser {
    return this.storage.state;
  }
}

export class userServices extends ServiceCollection<IUser, IUsers> {
  constructor() {
    super("users", {
      list: [],
      loading: false,
      param: "TEST",
    });
  }
  updateParam(param = "UPDATE") {
    this.requests.update({ param });
    this.storage.state.param = param;
  }
}
