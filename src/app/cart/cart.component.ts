import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { LocalStorageService } from '../localStorageService';
import { IUser } from '../login/login.component';



export interface IBikes {
  id: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  localStorageService: LocalStorageService<IBikes>;
  bikes: Array<IBikes> = [

  ];

  currentUser: IUser;
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) {

    this.localStorageService = new LocalStorageService('bikes');
  }

  async ngOnInit() {
    const bikes = JSON.parse(localStorage.getItem('bikes'));
    if (bikes && bikes.length > 0) {
      this.bikes = bikes;
    } else {
      this.bikes = await this.loadBikesFromFile();
    }


  }


  async loadBikesFromFile() {
    const bikes = await this.http.get('assets/inventory.json').toPromise();
    return bikes.json();
  }

  deleteBike(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage();
  }

  addBike(key: string) {
    if (key === 'model1') {
      this.bikes.unshift({
        id: 1,
        image: '../../assets/bike1.jpeg',
        description: 'Bike Model 1',
        price: 5000,
        quantity: 1
      });
    }
    if (key === 'model2') {
      this.bikes.unshift({
        id: 2,
        image: '../../assets/bike2.jpeg',
        description: 'Bike Model 2',
        price: 4000,
        quantity: 2
      });
    }
    if (key === 'model3') {
      this.bikes.unshift({
        id: 3,
        image: '../../assets/bike3.jpeg',
        description: 'Bike Model 3',
        price: 3000,
        quantity: 3
      });
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const bikes = localStorage.setItem('bikes', JSON.stringify(this.bikes));
  }


}
