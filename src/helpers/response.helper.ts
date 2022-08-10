export class ResponseHelper {
  static success<T>(data: T, message = 'success'): IResponseHelper<T> {
    return { data, message };
  }

  static error<T>(message: string, data: T | null): IResponseHelper<T> {
    return { data, message };
  }

  static paged<T>(
    data: T | null,
    size: number,
    page: number,
    total: number,
    message: string,
  ): IResponseHelper<T> {
    return { data, message, page, size, total };
  }
}

export interface IResponseHelper<T> {
  message?: string;
  data: T;
  page?: number;
  size?: number;
  total?: number;
}
