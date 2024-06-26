import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './app.component.css'
})
export class LayoutComponent implements OnInit {
  
  constructor(private router: Router, private userServices: UserServices){}

  username: string;
  avatar: string;
  role: number;
 
  ngOnInit(){ 
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res =>{
          let user : User = res as User;
          this.username = user.username;
          this.avatar = user.avatar;
          this.role = user.roleId;
        },
        err =>{
          console.log(err);
        }
      )
    }
  }

  Logout(){
    sessionStorage.removeItem('username');

    sessionStorage.removeItem('role');
    this.router.navigate(['Login']);
  }
}
