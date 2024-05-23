import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { error } from 'console';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterOutlet,RouterLink, TableModule],
  templateUrl: 'UsersList.component.html',
  styleUrl: './app.component.css',
  host: { 'collision-id': 'UsersListcomponent' },
})
export class UsersListcomponent implements OnInit{
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router){}

    users: User[];

    ngOnInit(){
        this.userServices.FindAllUser().then(
            res =>{
                this.users = res as User[];
            },
            err =>{
                console.log(err);
            }
        )
    }
  
    delete(id: number){

    }
    
}
