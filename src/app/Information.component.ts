import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, ToastModule, ButtonModule, RippleModule, FileUploadModule],
    templateUrl: 'Information.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'Informationcomponent' },
    providers: [MessageService]
})
export class Informationcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private messageService: MessageService) { }

    InforForm: FormGroup;
    username: string;
    id: number;
    name: string;
    avatar: string;
    file: File;
    url: string;

    ngOnInit() {
        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            if (sessionStorage.getItem('username') != null) {
                this.name = sessionStorage.getItem('username');
            }

            this.userServices.findByUsername(this.name).then(
                res => {
                    let user: User = res as User;
                    this.avatar = user.avatar;
                    this.id = user.id;
                    this.InforForm = this.formBuilder.group({
                        id: user.id,
                        username: [user.username, [Validators.required]],
                        email: [user.email, [Validators.required]],
                        name: [user.name, [Validators.required]],
                        phone: [user.phone, [Validators.required]],
                        avatar: user.avatar,
                        roleId: user.roleId,
                        password: user.password,
                        status: user.status,
                        securityCode: user.securityCode,
                    });
                },
                err => {
                    console.log(err)
                }
            )
        }
    }

    SelectFile(Event: any) {
        this.file = Event.target.files[0];
    }

    Upload() {
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('id', String(this.id));
        this.userServices.Upload(formData).then(
            res => {
                this.messageService.add({ severity: 'success', summary: 'Success !', detail: 'Update Avatar Success', key: 'tl', life: 2000 });
                location.reload();
            },
            error => {
                console.log(error);
            }
        );
    }

    Save() {
        let user: User = this.InforForm.value as User;
        this.username = user.username;
        let avartarurl = user.avatar;
        let avatar = avartarurl.lastIndexOf('/');
        user.avatar = avartarurl.slice(avatar + 1);

        this.userServices.Update(user).then(
            res => {
                if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
                    sessionStorage.setItem('username', this.username);
                    this.messageService.add({ severity: 'success', summary: 'Success !', detail: 'Update Success', key: 'tl', life: 2000 });
                }
            },
            err => {
                console.log(err);
            }
        );
    }
}
