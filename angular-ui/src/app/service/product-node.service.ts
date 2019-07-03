import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductNodeService {

  constructor(private httpClient: HttpClient) { }

  // crudOperation(options: any, operation: any, formData?: any, productId?: any): Observable<any> {
  crudOperation(options): Observable<any> {

    const applicationURI = environment.applicationURI;


    switch (options.operation) {
      case environment.operation.all:
        return this.httpClient
          .get(`${applicationURI}/${environment.operation.all}`);

      case environment.operation.add:
        return this.httpClient
          .post(`${applicationURI}/${environment.operation.add}`, options.formData);

      case environment.operation.update:
        return this.httpClient
          .put(`${applicationURI}/${environment.operation.update}/${options.productId}`, options.formData);

      case environment.operation.delete:
        return this.httpClient
          .delete(`${applicationURI}/${environment.operation.delete}/${options.productId}`);

      case environment.operation.search:
        return this.httpClient
          .get(`${applicationURI}/${environment.operation.search}/${options.productId}`);


      default:
        break;
    }
    // this.httpClient
    return;
  }
}
