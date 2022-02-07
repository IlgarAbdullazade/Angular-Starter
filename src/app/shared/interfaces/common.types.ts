export interface CustomResponse {
  status: boolean,
  message: string | null,
  meta_data: MetaData | null
}

export interface MetaData {
  title: string,
  type: string | null,
  value: any | null
}

