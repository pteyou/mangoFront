import { HttpClient, HttpHeaders } from "@angular/common/http";
import { APIType, RequestDto } from "../Model/RequestDto";
import { ResponseDto } from "../Model/ResponseDto";
import { Observable, catchError, of } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseServiceInterface } from "./BaseServiceInterface";

@Injectable({
    providedIn: 'root'
})
export class BaseService implements BaseServiceInterface {

    constructor(private httpClient: HttpClient) { }

    SendAsync(requestDto: RequestDto): Observable<ResponseDto> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: requestDto.AccessToken
            })
        }
        var result: Observable<ResponseDto>;
        switch(requestDto.ApiType) {
            case APIType.GET:
                result = this.httpClient.get<ResponseDto>(requestDto.Url, httpOptions);
                break;
            case APIType.POST:
                result = this.httpClient.post<ResponseDto>(requestDto.Url, requestDto.Data, httpOptions);
                break;
            case APIType.PUT:
                result = this.httpClient.put<ResponseDto>(requestDto.Url, requestDto.Data, httpOptions);
                break;
            case APIType.DELETE:
                result = this.httpClient.delete<ResponseDto>(requestDto.Url, httpOptions);
                break;
        }
        return result.pipe(
            catchError(err => this.handleError(err, requestDto))
        );
    }


    handleError(error: any, requestDto: RequestDto): Observable<ResponseDto> {
        var response: ResponseDto = {
            result: undefined,
            isSuccess: false,
            message: `Error in Http Request for url ${requestDto.Url}: ${error}`
        }
        return of(response)
    }
  }