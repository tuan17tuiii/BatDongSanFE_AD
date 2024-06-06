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
    templateUrl: 'UsersList.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'UsersListcomponent' },
})
export class UsersListcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router) { }

    users: User[];
    msg: string;

    ngOnInit() {
        this.userServices.FindAllUser().then(
            res => {
                this.users = res as User[];
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
                        this.ngOnInit();
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
                    let avartarurl = user.avatar;
                    let avatar = avartarurl.lastIndexOf('/');
                    user.avatar = avartarurl.slice(avatar + 1);
                    this.userServices.Update(user).then(
                        res => {
                            this.ngOnInit();
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

    Deactive(id: number) {
        this.userServices.findById(String(id)).then(
            res => {
                if (res) {
                    let user = res as User;
                    let avartarurl = user.avatar;
                    let avatar = avartarurl.lastIndexOf('/');
                    user.avatar = avartarurl.slice(avatar + 1);
                    user.status = false;
                    this.userServices.Update(user).then(
                        res => {
                            this.ngOnInit();
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
