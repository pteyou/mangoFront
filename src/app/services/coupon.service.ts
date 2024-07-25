import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { CouponDto } from '../Model/CouponDto';
import { APIType, RequestDto } from '../Model/RequestDto';
import { UrlConfig } from '../../assets/urlconfig';
import { ResponseDto } from '../Model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CouponService extends BaseService {
  GetAllCouponsAsync(): Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.GET,
      Url: UrlConfig.CouponApiUrl + '/api/couponapi',
      AccessToken : ''
    }
    return this.SendAsync(requestDto);
  } 

  GetCouponAsync(couponCode: string) : Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.GET,
      Url: UrlConfig.CouponApiUrl + '/api/couponapi/GetByCode/' + couponCode,
      AccessToken : ''
    }
    return this.SendAsync(requestDto);
  }

  GetCouponByIdAsync(couponId: number) : Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.GET,
      Url: UrlConfig.CouponApiUrl + '/api/couponapi/' + couponId,
      AccessToken : ''
    }
    return this.SendAsync(requestDto);
  }

  CreateCouponAsync(couponDto: Partial<CouponDto>) : Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.POST,
      Data: couponDto,
      Url: UrlConfig.CouponApiUrl + '/api/couponapi/',
      AccessToken : ''
    }
    return this.SendAsync(requestDto);
  }

  UpdateCouponAsync(couponDto: CouponDto) : Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.PUT,
      Data: couponDto,
      Url: UrlConfig.CouponApiUrl + '/api/couponapi/',
      AccessToken : ''
    }
    return this.SendAsync(requestDto);
  }

  DeleteCouponAsync(couponId: number) : Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.DELETE,
      Url: UrlConfig.CouponApiUrl + `/api/couponapi/${couponId}`,
      AccessToken : ''
    }
    return this.SendAsync(requestDto);
  }
}
