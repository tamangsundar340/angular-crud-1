import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products = []
  isLoading = false;
  editMode: boolean = false;
  productEditKey;
  alertMessage = "";

  constructor(private _crudService: AppServiceService) { }

  ngOnInit(): void {
    this.fetchData()
  }



  productForm = new FormGroup({
    productid: new FormControl(null, Validators.required),
    productname: new FormControl(null, Validators.required),
    productprice: new FormControl(null,
      [
        Validators.required,
        Validators.maxLength(10)
      ]),
  })

  // add product
  onSubmit() {
    // console.log("form is submitted")
    if (this.editMode) {
      this._crudService.updateProduct(this.productEditKey, this.productForm.value).subscribe((res) => {
        this.fetchData();
        this.alertMessage = "Product data updated successfully!!"
      })
      this.editMode = false;
    } else {
      this.products.push(this.productForm.value)
      this._crudService.addproduct(this.productForm.value).subscribe((res) => {
        this.alertMessage = "Product data added successfully!!"
      })
    }
    this.productForm.reset()
  }


  // fetch product
  fetchData() {
    this._crudService.fetchProduct().subscribe((res) => {
      this.products = res;
    })
  }


  //delete product
  onDeleteProduct(productkey) {
    console.log(productkey)
    if (confirm("Are you sure you want to delete this product ?")) {
      this._crudService.deleteProduct(productkey).subscribe((res) => {
        this.fetchData();
      })
    }
  }

  //edit product
  onEditProduct(productkey, index) {
    this.editMode = true;
    this.productEditKey = productkey

    this.productForm.setValue({
      productid: this.products[index].productid,
      productname: this.products[index].productname,
      productprice: this.products[index].productprice,
    })

  }



}
