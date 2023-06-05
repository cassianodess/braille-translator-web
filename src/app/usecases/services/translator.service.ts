import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BrailleResponse } from '../models/brailleResponse';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  private URL: string = `${environment.baseURL}/translate`;
  private TOKEN: string = environment.token;

  constructor(private http: HttpClient) { }

  public translate(form: FormData): Observable<BrailleResponse> {
    return this.http.post<BrailleResponse>(this.URL, form, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.TOKEN}`,
        // "Content-Type": "multipart/form-data",
      }),
    });
  }
}
