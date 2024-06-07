import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { RoleServices } from './Services/Role.Services';
import { Role } from './Entities/Role.entities';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule, PasswordModule, DividerModule],
  templateUrl: 'register.component.html',
  host: { 'collision-id': 'RegisterComponent' },
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private roleServices: RoleServices, private messageService: MessageService) { }

  registerForm: FormGroup;
  username: string;
  email: string;
  password: string;
  Roles: Role[];
  msg: string;
  user_name: string;
  avatar: string;
  role: number;

  roleValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value === 'all';
      return forbidden ? { 'invalidRole': { value: control.value } } : null;
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/), Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      roleId: ['all', [Validators.required, this.roleValidator()]],
    });
      
    this.roleServices.FindAll().then(
      res => {
        this.Roles = res as Role[];
      },
      err => {
        console.log(err);
      }
    )

    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res =>{
          let user : User = res as User;
          this.user_name = user.username;
          this.avatar = user.avatar;
          this.role = user.roleId;
        },
        err =>{
          console.log(err);
        }
      )
    }
  }

  Register() {
    let user: User = this.registerForm.value as User;

    this.userServices.AccountExists(user.username, user.email).then(
      res => {
        if (res) {
          this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Username or Email already exists !', key: 'tl', life: 2000 });
        } else {
          this.userServices.Register(user).then(
            res => {
              if (res) {
                this.messageService.add({ severity: 'success', summary: 'Register Success !', detail: 'Register Successful! Please go to your Email and Verify the account !', key: 'tl', life: 2000 });
                this.registerForm.reset()
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  
}
