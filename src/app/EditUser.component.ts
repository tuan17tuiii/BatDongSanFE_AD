import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { error } from 'console';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink,],
    templateUrl: 'EditUserAdmin.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'EditUsercomponent' },
})
export class EditUsercomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private activatedRoute: ActivatedRoute) { }

    InforForm: FormGroup;

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(p => {
            let id = p.get('id');
            this.userServices.findById(id).then(
                res => {
                    let user: User = res as User;
                    this.InforForm = this.formBuilder.group({
                        id: user.id,
                        username: user.username,
                        email: [user.email,[Validators.required]],
                        name: [user.name,[Validators.required]],
                        phone: [user.phone,[Validators.required]],
                        roleId: user.roleId,
                        password: user.password,
                        status: user.status,
                        securityCode: user.securityCode,
                        advertisementId: user.advertisement_id
                    });
                },
                err => {
                    console.log(err)
                }
            )
        });
    }

    Save() {
        let user: User = this.InforForm.value as User;

        this.userServices.Update(user).then(
            res => {
                this.router.navigate(['UsersList']);
            },
            err => {
                console.log(err);
            }
        );
    }
}
