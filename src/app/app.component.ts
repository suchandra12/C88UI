import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustodyWallets, Wallet } from './c88.interface';
import { ColDef } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddWallteDialogComponent } from './add-wallte-dialog/add-wallte-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient,public dialog: MatDialog) {}

  data: any;
  wallets: Wallet[] = [];
  transactions: any[] = [];
  exchange_wallets: Wallet[] = [];
  crypto_wallets: Wallet[] = [];
  other_wallets: Wallet[] = [];
  columnDefs: ColDef[] = [
    {
      headerName: 'Transaction',
      field: 'type',
      cellClassRules: { 'subscript-cell': 'data.value < 0' },
    },
    {
      headerName: 'Outgoing',
      field: 'outgoing',
      valueGetter: this.concatOutgoingData,
    },
    {
      headerName: 'Incoming',
      field: 'incoming',
      valueGetter: this.concatIncomingData,
    },
    { headerName: 'Fee', field: 'fee', valueGetter: this.concatFeeData },
  ];
  tokenColumnDefs: ColDef[] = [
    { headerName: 'token', field: 'token' },
    { headerName: 'transactions', field: 'transactionCount' },
  ];
  rowData: any[] = [];
  rowAssetData: any[] = [];
  rowTokenData: any[] = [];
  selectedType: string[] = [];
  selectedWallet = '';
  showTokenGrid: boolean = false;
  types = new FormControl('');
  dates = new FormControl('');
  @ViewChild('typeSelect') typeSelect: any;

  typeList: string[] = [
    'Buy',
    'Mint',
    'Receive',
    'Send',
    'Sell',
    'Trade',
    'Transfer',
  ];
  /*
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }  ];

*/
  ngOnInit(): void {
    this.postData();
  }
  showAccordions = false;
  toggleAccordions() {
    this.showAccordions = !this.showAccordions;
  }
  postData() {
    this.http
      .post<CustodyWallets>(
        'http://ec2-3-84-184-147.compute-1.amazonaws.com:8080/mock/api/wallets',
        { data: '{}' }
      )
      .subscribe((data) => {
        this.wallets = data.wallets; // assign the wallets array to the response from API
        this.rowData = data.wallets[0].assets[0].transactions;
        console.log(this.rowData);
        // save the data in a global object
        this.data = data;
        this.exchange_wallets = this.wallets.filter(
          (wallet) => wallet.type === 1
        ); // filter exchange wallets
        this.crypto_wallets = this.wallets.filter(
          (wallet) => wallet.type === 2
        ); // filter crypto wallets
        this.other_wallets = this.wallets.filter(
          (wallet) => wallet.type !== 1 && wallet.type !== 2
        ); // filter other wallets
      });
  }

  handleClick(walletName: string) {
    console.log('wallet name=' + walletName);
    let transactions: any[] = [];
    let tokens: any[] = [];
    let transactionCount: any;
    let tokenTrans: {
      token: string;
      transactionCount: number;
    }[] = [];
    this.selectedWallet = walletName;
    const wallet = this.wallets.find((w) => w.name === walletName);
    if (wallet) {
      wallet.assets.forEach(
        (asset) => (transactions = transactions.concat(asset.transactions))
      );
      wallet.assets.forEach((asset) => (tokens = tokens.concat(asset.symbol)));
      if (tokens.length > 0) {
        tokens.forEach((element) => {
          transactionCount = wallet.assets.find((x) => x.symbol === element)
            ?.transactions.length;
          tokenTrans.push({
            token: element,
            transactionCount: transactionCount,
          });
        });
        this.showTokenGrid = true;
      }
    }

    this.rowData = transactions;
    this.rowTokenData = tokenTrans;

    // bind to asset data rowAssetData
  }

  onTypeChanged(e: any) {
    this.selectedType = e.value;
  }

  onClearFilter() {
    this.typeSelect.value = null;
    this.typeSelect?.writeValue(null);
    this.selectedType = [];
  }

  removeSelectedType(type: string): void {
    const index = this.selectedType.indexOf(type);
    if (index >= 0) {
      this.selectedType.splice(index, 1);
      this.typeSelect.writeValue(this.selectedType);
    }
  }

  onRowClicked(e: any) {
    let transactions: any;
    const wallet = this.wallets.find((w) => w.name === this.selectedWallet);
    if (wallet) {
      transactions = wallet.assets.find(
        (x) => x.symbol === e.data.token
      )?.transactions;
    }
    this.rowData = transactions;
  }

  concatFeeData(params: any) {
    const feeAmount = params.data.feeAmount;
    const feeCurrency = params.data.feeCurrency;
    return feeAmount + ' ' + feeCurrency;
  }

  concatIncomingData(params: any) {
    if (params.data.type === 'Buy' || params.data.type === 'Receive') {
      const receivedQuantity = params.data.receivedQuantity;
      const receivedCurrency = params.data.receivedCurrency;
      return receivedQuantity + ' ' + receivedCurrency;
    }

    return null;
  }

  concatOutgoingData(params: any) {
    if (params.data.type === 'Buy' || params.data.type === 'Sell') {
      const sentQuantity = params.data.sentQuantity;
      const sentCurrency = params.data.sentCurrency;
      return sentQuantity + ' ' + sentCurrency;
    }

    return null;
  }

  openDialog() {
    const dialogRef = this.dialog.open( AddWallteDialogComponent);

  }

  
}