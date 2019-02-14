import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Product } from './product'

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private httpClient: HttpClient) { }
  public viewProduct(): Observable<any> {
        return this.httpClient.get<Product[]>("http://demo4126999.mockable.io/images");
  }
}


