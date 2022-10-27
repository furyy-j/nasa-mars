import { Injectable } from '@angular/core';
import {environment as env} from "@environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpResponse } from '@core/interfaces/http-response.interface';
import { IPhotos } from '@core/interfaces/photos.interface';
import { Params } from "@angular/router";

@Injectable()
export class AppService {
  private apiUrl = `${env.apiUrl}/${env.api.rovers}`;

  constructor(
    private http: HttpClient,
  ) { }

  getImages(queryParams: Params, path: string): Observable<IHttpResponse<IPhotos[]>> {
    const params = new HttpParams({fromObject: queryParams});
    return this.http.get<IHttpResponse<IPhotos[]>>(`${this.apiUrl}/${path}`, {params});
  }
}
