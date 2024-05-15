import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from './Entities/User.entities';
import { UserServices } from './Services/User.Services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class Logincomponet implements OnInit{

  constructor(private userServices: UserServices, private router: Router) {

  }

  username: string;
  password: string;

  ngOnInit() {

  }

  Login(){
    let user = new User();
    user.username = this.username;
    user.password = this.password;
    this.userServices.Login(user).then(
      res =>{
        sessionStorage.setItem('username', this.username);
        this.router.navigate(['/admin/home']);
      },
      err =>{
        console.log(err);
      }
    );
  }
}
