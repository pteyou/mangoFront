import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Model/ResponseDto';
import { APIType, RequestDto } from '../Model/RequestDto';
import { UrlConfig } from '../../assets/urlconfig';
import { RegistrationRequestDTO } from '../Model/RegistrationRequestDTO';
import { LoginRequestDTO } from '../Model/LoginRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  RegisterUserAsync(registrationRequestDto: RegistrationRequestDTO): Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.POST,
      Url: UrlConfig.AuthAPIUrl + '/api/auth/register',
      Data: registrationRequestDto,
      AccessToken: ''
    }
    return this.SendAsync(requestDto);
  }

  LogUserInAsync(loginRequestDto: LoginRequestDTO): Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.POST,
      Url: UrlConfig.AuthAPIUrl + '/api/auth/login',
      Data: loginRequestDto,
      AccessToken: ''
    }
    return this.SendAsync(requestDto);
  }

  AssignUserRoleAsync(registrationRequestDTO: RegistrationRequestDTO): Observable<ResponseDto> {
    var requestDto: RequestDto = {
      ApiType: APIType.POST,
      Url: UrlConfig.AuthAPIUrl + '/api/auth/assignrole',
      Data: registrationRequestDTO,
      AccessToken: ''
    }
    return this.SendAsync(requestDto);
  }
}
