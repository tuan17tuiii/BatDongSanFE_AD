import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { RoleServices } from './Services/Role.Services';
import { Role } from './Entities/Role.entities';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: 'register.component.html',
  host: { 'collision-id': 'RegisterComponent' },
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private roleServices: RoleServices) { }

  registerForm: FormGroup;
  username: string;
  email: string;
  password: string;
  Roles: Role[];
  msg: string;

  roleValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value === 'all';
      return forbidden ? { 'invalidRole': { value: control.value } } : null;
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
  }

  Register() {
    let user: User = this.registerForm.value as User;

    this.userServices.Register(user).then(
      res => {
        console.log(user);
        this.msg = "Success";
      },
      err => {
        console.log(err);
      }
    );
  }

  
}
