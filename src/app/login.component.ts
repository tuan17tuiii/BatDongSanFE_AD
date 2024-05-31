import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from './Entities/User.entities';
import { UserServices } from './Services/User.Services';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule],
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class Logincomponet implements OnInit {

  constructor(private userServices: UserServices, private router: Router, private messageService: MessageService) {

  }

  username: string;
  password: string;
  msg: string;

  ngOnInit() {

  }

  Login() {
    let user = new User();
    user.username = this.username;
    user.password = this.password;
<<<<<<< HEAD
    this.userServices.LoginAdmin(user).then(
      res =>{
        if(res['result']){
          console.log(res);
          if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            sessionStorage.setItem('username', this.username);
            this.router.navigate(['/home']);
          }
        }else {
          this.messageService.add({ severity: 'error', summary: 'Login Failed !', detail: 'Username or Password is not correct !', key: 'tl', life: 2000 });
      }
=======

    this.userServices.findByUsername(this.username).then(
      res => {
        let userRole = res as User;
        user.roleId = userRole.roleId;
>>>>>>> 130f9ef4bd8cfc789a3f9555c53267d8bd77b593
      },
      err => {
        console.log(err)
      }
    )

    this.userServices.Login(user).then(
      res => {
        console.log(res);
        if (res['result']) {
          if (user.roleId == 1) {
            if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
              sessionStorage.setItem('username', this.username);
              sessionStorage.setItem('role', String(user.roleId));
              this.router.navigate(['/home']);
            }
          } else {
            this.messageService.add({ severity: 'error', summary: 'Access Denied !', detail: 'You do not have permission to access this website !', key: 'tl', life: 2000 });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Login Failed !', detail: 'Username or Password is not correct !', key: 'tl', life: 2000 });
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
