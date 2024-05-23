import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterOutlet,RouterLink, ],
  templateUrl: 'Information.component.html',
  styleUrl: './app.component.css',
  host: { 'collision-id': 'Informationcomponent' },
})
export class Informationcomponent implements OnInit{
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router){}

    InforForm: FormGroup;
    username: string;
    name: string;

    ngOnInit(){
        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            if(sessionStorage.getItem('username') != null){
                this.name = sessionStorage.getItem('username');
            }

            this.userServices.findByUsername(this.name).then(
                res =>{
                    let user: User = res as User;
                    this.InforForm = this.formBuilder.group({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        roleId: user.roleId,   
                        password: user.password,
                        status: user.status,
                        securityCode: user.securityCode               
                    });
                },
                err =>{
                    console.log(err)
                }
            )
          }           
    }
  
    Save(){
      let user: User = this.InforForm.value as User;
      this.username = user.username;

      this.userServices.Update(user).then(
          res =>{
            if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
                sessionStorage.setItem('username', this.username);
                this.router.navigate(['/admin/home']);
              }           
          },
          err =>{
              console.log(err);
          }
      );
    }
}
