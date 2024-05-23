import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
            console.log(id);
            this.userServices.findById(id).then(
                res => {
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
                this.router.navigate(['/admin/UsersList']);
            },
            err => {
                console.log(err);
            }
        );
    }
}
