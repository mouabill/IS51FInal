import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


export interface IUser {
  id?: number;
  username: string;
  password: string;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: IUser = { username: '', password: '' };
  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }


  login(user: IUser) {
    console.log('login user: ', user);
    const defaultUser: IUser = { username: 'mouabill', password: 'moua123' };
    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        this.router.navigate(['cart']);
      } else {
        this.toastService.showToast('warning', 2000, 'Login in failed! Please enter correct information');
      }
    } else {
      this.toastService.showToast('danger', 1500, 'Login in failed! Please fill in information');
    }
  }


}
