import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUpload } from './file.model'

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentsService {

  public BASE_API = 'http://localhost:64968';

  public UPLOAD_DOCUMENT_URL = this.BASE_API + '/' + 'api/UploadFiles';
  public GET_ALL_RECORDS = this.BASE_API + '/' + 'api/UploadFiles';
  public GET_RECORD_BY_ID = this.BASE_API + '/' + 'api/UploadFiles';


  constructor(public http: HttpClient) { }


  addHttptHeader(jsonType: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    if (jsonType) {
      headers = headers.append('Content-Type', 'application/json');
    } else {
      headers = headers.append('Content-Type', 'text/plain');
    }
    return headers;
  }

  uploadDocuments(fileUpload: any): Observable<any> {
    return this.http.post<any>(this.UPLOAD_DOCUMENT_URL, fileUpload);
  }

  getAllDocuments(): Observable<FileUpload> {
    return this.http.get<FileUpload>(this.GET_ALL_RECORDS);
  }
  getDocumentById(id: number): Observable<FileUpload> {
    return this.http.get<FileUpload>(this.GET_RECORD_BY_ID + '/' + id);
  }

}
