import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { error } from 'console';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, ConfirmPopupModule, ToastModule, ButtonModule, RippleModule],
    templateUrl: 'AgentList.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'AgentsListcomponent' },
    providers: [ConfirmationService, MessageService]
})
export class AgentsListcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

    agents: User[];
    msg: string;

    ngOnInit() {
        this.userServices.FindAllAgent().then(
            res => {
                this.agents = res as User[];
            },
            err => {
                console.log(err);
            }
        )
    }

    delete(id: number, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure !',
            icon: 'pi pi-exclamation-circle',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            acceptLabel: 'Confirm',
            rejectLabel: 'Cancel',
            rejectButtonStyleClass: 'p-button-outlined p-button-sm btn btn-info mr-2',
            acceptButtonStyleClass: 'p-button-sm btn btn-danger mr-2',
            accept: () => {
                this.userServices.Delete(id).then(
                    res => {
                        if (res) {
                            this.ngOnInit();
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Delete Failed !', life: 3000 });
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
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
                            this.messageService.add({ severity: 'success', summary: 'Activated !', detail: 'Activation successful !', life: 3000 });
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
                            this.messageService.add({ severity: 'success', summary: 'Deactivated !', detail: 'Deactivation successful !', life: 3000 });
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
