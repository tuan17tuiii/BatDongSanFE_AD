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
    host: { 'collision-id': 'EditAdmincomponent' },
})
export class EditAdmincomponent implements OnInit {
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
                        email: [user.email,[Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
                        name: [user.name,[Validators.required]],
                        phone: [user.phone,[Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
                        roleId: user.roleId,
                        password: user.password,
                        status: user.status,
                        securityCode: user.securityCode,
                        advertisementId: user.advertisement_id,
                        avatar: user.avatar
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
        let avartarurl = user.avatar;
        let avatar = avartarurl.lastIndexOf('/');
        user.avatar = avartarurl.slice(avatar + 1);
        
        this.userServices.Update(user).then(
            res => {
                this.router.navigate(['AdminsList']);
            },
            err => {
                console.log(err);
            }
        );
    }
}
