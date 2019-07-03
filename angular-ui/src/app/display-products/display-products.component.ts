import { Component, OnInit } from '@angular/core';
import { ProductNodeService } from '../service/product-node.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



export interface PeriodicElement {

  name: string;
  productId: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { productId: 1, name: 'Hydrogen' },
  { productId: 2, name: 'Helium' },
  { productId: 3, name: 'Lithium' },
  { productId: 4, name: 'Beryllium' },
  { productId: 5, name: 'Boron' },
  { productId: 6, name: 'Carbon' },
  { productId: 7, name: 'Nitrogen' },
  { productId: 8, name: 'Oxygen' },
  { productId: 9, name: 'Fluorine' },
  { productId: 10, name: 'Neon' },
];


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'name', "productCode", "price", "starRating", "imageUrl", "releaseDate", 'symbol'
  ];
  dataSource = [];
  operation = environment.operation;
  constructor(private nodeService: ProductNodeService, private router: Router) { }

  ngOnInit() {
    this.nodeService.crudOperation({
      operation: environment.operation.all
    })
      .subscribe(success => {
        console.log(`${JSON.stringify(success)}`);

        var data = success.data;
        var setVar = Object.values(data).map(x => {
          return {
            productId: x['productId'],
            name: x['name'],
          }
        })
        // data.map  
        // = success.data.ma
        this.dataSource = data;
      })

  }

  goEdit(opr, id?: any) {
    console.log(`came${id}`);

    var url = opr == this.operation.add ? `/product/${opr}/` : `/product/${opr}/${id}`;
    this.router.navigateByUrl(url);
  }
}




