import { Observable } from "rxjs";
import { RequestDto } from "../Model/RequestDto";
import { ResponseDto } from "../Model/ResponseDto";

export interface BaseServiceInterface {
    SendAsync(requestDto: RequestDto): Observable<ResponseDto>;
}