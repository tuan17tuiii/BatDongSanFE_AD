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
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule],
    templateUrl: 'AdminsList.component.html',
    host: { 'collision-id': 'AdminsListcomponent' },
    styleUrl: './app.component.css'
})
export class AdminsListcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router) { }

    admins: User[];
    msg: string;

    ngOnInit() {
        this.userServices.FindAllAdmin().then(
            res => {
                this.admins = res as User[];
            },
            err => {
                console.log(err);
            }
        )
    }

    delete(id: number) {
        var result = confirm('Are you sure !');
        if (result) {
            this.userServices.Delete(id).then(
                res => {
                    if (res) {
                        location.reload();
                    } else {
                        this.msg = 'Failed !';
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    Active(id: number) {
        this.userServices.findById(String(id)).then(
            res => {
                if (res) {
                    let user = res as User;
                    user.status = true;
                    this.userServices.Update(user).then(
                        res =>{
                            location.reload();
                        },
                        err =>{
                            console.log(err);
                        }
                    );
                };
            },
            err => {
                console.log(err);
            }
        );
    }

    Deactive(id: number) {
        this.userServices.findById(String(id)).then(
            res => {
                if (res) {
                    let user = res as User;
                    user.status = false;
                    this.userServices.Update(user).then(
                        res =>{
                            location.reload();
                        },
                        err =>{
                            console.log(err);
                        }
                    );
                };
            },
            err => {
                console.log(err);
            }
        );
    }
}
