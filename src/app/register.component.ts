import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router){}

  registerForm: FormGroup;
  username: string;
  email: string;
  password: string;

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
        username: '',
        password: '',
        email: '',
        roleId: 1
    });
  }

  Register(){
    let user: User = this.registerForm.value as User;
    
    this.userServices.Register(user).then(
        res =>{
            this.router.navigate([''])
        },
        err =>{
            console.log(err);
        }
    );
  }
}
