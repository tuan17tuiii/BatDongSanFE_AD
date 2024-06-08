import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Image } from './Entities/image.entities';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, ConfirmPopupModule, ToastModule, ButtonModule, RippleModule],
    templateUrl: 'AgentRequest.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'AgentRequestcomponent' },
    providers: [ConfirmationService, MessageService]
})
export class AgentRequestcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService) { }

    user: User = new User;
    front: string;
    back: string;
    userimg: string;
    anotherimg: string[] = [];

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(p => {
            let id = p.get('id');
            this.userServices.findById(id).then(
                res => {
                    this.user = res as User;
                    this.front = this.user.image[0]?.urlImage;
                    this.back = this.user.image[1]?.urlImage;
                    this.userimg = this.user.image[2]?.urlImage;

                    if (this.user.image.length > 3) {
                        this.anotherimg = this.user.image.slice(3).map(img => img.urlImage);
                    }
                },
                err => {
                    console.log(err)
                }
            )
        });
    }

    ConfirmRequest(id: number) {
        this.userServices.findById(String(id)).then(
            res => {
                if (res) {
                    let user: User = res as User;
                    let avartarurl = user.avatar;
                    let avatar = avartarurl.lastIndexOf('/');
                    user.avatar = avartarurl.slice(avatar + 1);
                    user.statusUpdate = false;
                    user.roleId = 4;
                    this.userServices.Update(user).then(
                        res => {
                            this.messageService.add({ severity: 'success', summary: 'Accepted !', detail: 'Request Accepted !', life: 3000 });
                            this.router.navigate(['/AgentsList']);
                        },
                        err => {
                            console.log(err);
                        }
                    )
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Accepted Failed !', life: 3000 });
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    CancelRequest(id: number){
        this.userServices.findById(String(id)).then(
            res => {
                if (res) {
                    let user: User = res as User;
                    let avartarurl = user.avatar;
                    let avatar = avartarurl.lastIndexOf('/');
                    user.avatar = avartarurl.slice(avatar + 1);
                    user.statusUpdate = false;
                    this.userServices.Update(user).then(
                        res => {
                            this.messageService.add({ severity: 'success', summary: 'Rejected !', detail: 'Request Rejected !', life: 3000 });
                            this.router.navigate(['/UsersList']);
                        },
                        err => {
                            console.log(err);
                        }
                    )
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Rejected Failed !', life: 3000 });
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}
