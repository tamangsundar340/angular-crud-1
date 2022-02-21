import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AppModule} from 'src/app/appModule/app-module/app-module.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  url = 'https://angular-crud-bd9ca-default-rtdb.asia-southeast1.firebasedatabase.app/products.json'
  single_url  = 'https://angular-crud-bd9ca-default-rtdb.asia-southeast1.firebasedatabase.app/products/'

  constructor(private http:HttpClient) { }

  // add product
  addproduct(product : AppModule){
    return this.http.post<AppModule>(this.url, product)
  }

  //fetch product
  fetchProduct() :Observable<AppModule []>{
    return this.http.get<AppModule>(this.url).pipe(map(res =>{
      const productArray = []

      for(const key in res){
        if(res.hasOwnProperty(key)){
          productArray.push({productkey:key, ...res[key]})
        }
      }
      return productArray
    }))
  }

  //delete product
  deleteProduct(productkey){
    return this.http.delete(this.single_url+productkey+'.json')
  }

  //
  updateProduct(productkey, product){
    return this.http.put(this.single_url+productkey+'.json',product)
  }







}
