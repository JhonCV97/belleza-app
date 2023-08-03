import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

interface Product {
  Name: string;
  Price: number;
}

interface ProductSale {
  Product: Product;
  Amount: number;
  TotalPrice: number;
}

interface Sale {
  Client: string,
  Id: string,
  Address: string,
  Products: ProductSale[],
  Total: number
}

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class SalePage {

  constructor(
    private alertController: AlertController
  ) {}

  ClientName: string = '';
  ClientId: string = '';
  Address: string = '';
  SelectedProduct: any;
  QuantityProduct: number = 1;

  Sale: Sale  = {
    Client: '',
    Id: '',
    Address: '',
    Products: [],
    Total: 0
  };

  Products: Product[] = [
    { Name: 'Producto 1', Price: 50 },
    { Name: 'Producto 2', Price: 30 },
    { Name: 'Producto 3', Price: 25 },
  ];

  async ShowMissingDataAlert() {
    const alert = await this.alertController.create({
      header: 'Faltan datos',
      message: 'Por favor ingrese el Nombre, Cédula, Dirección y seleccione un Producto antes de agregar.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async AddProduct() {

    if (!this.SelectedProduct || !this.QuantityProduct || this.QuantityProduct <= 0) {
      await this.ShowMissingDataAlert();
      return;
    }

    const TotalPrice = this.SelectedProduct.Price * this.QuantityProduct;
    const saleProduct: ProductSale = {
      Product: this.SelectedProduct,
      Amount: this.QuantityProduct,
      TotalPrice: TotalPrice
    };

    this.Sale.Products.push(saleProduct);
    this.Sale.Total += TotalPrice;

    this.SelectedProduct = null;
    this.QuantityProduct = 1;
  }
}