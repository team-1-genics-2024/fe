export type PaginateData<Data> = {
  data_per_page: Data;
  meta: {
    page: number;
    max_page: number;
  };
};

export interface PaginatedApiResponse<TData> {
  status: boolean;
  message: string;
  error: string;
  data: TData;
  meta: {
    take: number;
    page: number;
    sort: string;
    filter: string;
    filter_by: string;
    total: number;
    total_page: number;
  };
}

export interface PaginatedParams {
  paramList?: {
    take?: number;
    page?: number;
    total_data?: number;
    total_page?: number;
    sort?: string;
    sort_by?: string;
    filter?: string;
    filter_by?: string;
  };
}

export type TableMeta = {
  take: number;
  page: number;
  total_data: number;
  total_page: number;
  sort: string;
  sort_by: string;
  filter: string;
  filter_by: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  status: boolean;
  code: number;
  data: T;
};

export type ApiError = {
  code: number;
  status: boolean | number;
  message: string;
};

export type UninterceptedApiError = {
  code: number;
  status: boolean;
  message: string | Record<string, string[]>;
};
