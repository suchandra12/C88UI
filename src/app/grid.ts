import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  template: `
    <ag-grid-angular 
      style="width: 100%; height: 100%;" 
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData">
    </ag-grid-angular>
  `
})
export class GridComponent {
  columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  rowData = [    { make: 'Toyota', model: 'Celica', price: 35000 },    { make: 'Ford', model: 'Mondeo', price: 32000 },    { make: 'Porsche', model: 'Boxter', price: 72000 }  ];
}
