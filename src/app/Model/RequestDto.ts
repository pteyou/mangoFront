export interface RequestDto {
    ApiType: APIType;
    Url: string;
    Data?: object;
    AccessToken: string;
}

export enum APIType {
    GET,
    POST,
    PUT,
    DELETE
}