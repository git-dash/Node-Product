import { Component, OnInit } from '@angular/core';
import { ProductNodeService } from '../service/product-node.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  sub: any;
  operation = environment.operation;
  filteredProductId: any;
  selectedOperation: any;
  searchDeleteForm: any;
  response: any = {};
  addEditForm: any;
  setSearchButtonName: string;
  disableSearchOnAdd: boolean = false;
  searchElementFound: boolean = false;
  showResponse: boolean = false;
  showProductForm: boolean = false;
  constructor(private nodeService: ProductNodeService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchDeleteForm = this.formBuilder.group({
      'productId': ['', [Validators.pattern("^[0-9]*$")]],
    });
    this.addEditForm = this.formBuilder.group({
      'productId': ['', [Validators.pattern("^[0-9]*$")]],
      'name': ['', []],
      "productCode": ['', []],
      "price": ['', []],
      "starRating": ['', []],
      "imageUrl": ['', []],
      "releaseDate": ['', []],
    });

    this.sub = this.route.params.subscribe(params => {

      this.selectedOperation = params['isEdit']; // (+) converts string 'id' to a number
      this.filteredProductId = params['productId'];

      this.disableSearchOnAdd = this.selectedOperation == 'add' ? true : false;
      this.setSearchButtonName = 'Search Additional Details';
      // console.log(`disableSearchOnAdd ${this.disableSearchOnAdd}:selectedOperation:${this.selectedOperation}`);

      // //set searchId
      // console.log(`searchDeleteForm:${JSON.stringify(this.searchDeleteForm.value.productId)}`);

      if (this.selectedOperation == 'add') {
        this.showProductForm = true;
        this.disableSearchOnAdd = true;
      }
      else {
        this.disableSearchOnAdd = false;

      }

      this.searchDeleteForm.setValue({

        'productId': this.filteredProductId
      })


    });


  }
  submit(opr, formData) {
    var options = {
      operation: opr
    };
    switch (opr) {
      case this.operation.all:
        // options['formData'] = formData;
        break;
      case this.operation.add:
        options['formData'] = formData;
        break;
      case this.operation.search:
      case this.operation.delete:
        options['productId'] = formData.productId;
        break;
      case this.operation.update:
        options['productId'] = formData.productId;
        options['formData'] = formData;
        break;



      default:
        break;
    }
    console.log('hi' + opr + JSON.stringify(formData));

    this.nodeService.crudOperation(
      options
      // opr, formData
    )
      .toPromise()
      .then(success => {
        this.showResponse = true;


        console.log(`${opr} Operation Performed`);
        this.response = success;

        if (opr == this.operation.search) {
          this.searchElementFound = true;
          const updateFrom = this.response.data[0];

          this.showProductForm = true;

          this.addEditForm.setValue({

            'productId': updateFrom['productId'],
            'name': updateFrom['name'],
            "productCode": updateFrom['productCode'],
            "price": updateFrom['price'],
            "starRating": updateFrom['starRating'],
            "imageUrl": updateFrom['imageUrl'],
            "releaseDate": updateFrom['releaseDate'],
          })

        }
      }, error => {
        this.showResponse = true;
        this.showProductForm = false;

        this.response = error['error'];
        console.log(`${opr} Operation Performed ${error['error']}`);
      })
      .finally(() => {
        console.log('came in finally');

        if (['update', 'delete'].includes(opr)) {
          this.addEditForm.reset();
          this.searchDeleteForm.reset();
          this.showProductForm = false;

        }
      })

    setTimeout(() => {
      this.response = {};
      this.showResponse = false;
    }, 5000);

  }
  // showProductForm() {
  //   if (this.selectedOperation == 'add' || (
  //     this.searchElementFound == true
  //   ))
  //     return true;
  // }


}
