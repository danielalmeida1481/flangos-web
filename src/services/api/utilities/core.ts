import { apiProvider } from "./provider";

export class ApiCore {
  get: ((id?: number) => Promise<any>) | undefined;
  post: ((data?: object) => Promise<any>) | undefined;
  put: ((data: object, id?: number) => Promise<any>) | undefined;
  remove: ((id: number) => Promise<any>) | undefined;

  constructor(options: {
    get: boolean;
    post: boolean;
    put: boolean;
    remove: boolean;
	url: string;
  }) {
    if (options.get) {
      this.get = (id?: number) => {
        return apiProvider.get(options.url, id);
      };
    }

    if (options.post) {
      this.post = (data?: object) => {
        return apiProvider.post(options.url, data ?? {});
      };
    }

    if (options.put) {
      this.put = (data: object, id?: number) => {
        return apiProvider.put(options.url, data, id);
      };
    }

    if (options.remove) {
      this.remove = (id: number) => {
        return apiProvider.remove(options.url, id);
      };
    }
  }
}
