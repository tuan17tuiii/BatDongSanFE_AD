import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { Transaction } from './Entities/Transaction.entities';
import { TransactionServices } from './Services/Transaction.services';
import { User } from './Entities/User.entities';
import { CalendarModule } from 'primeng/calendar';
import { formatDate } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RealState } from './Entities/realstate.entities';
import { RealStateService } from './Services/realstate.services';
import { RealstateType } from './Entities/RealstateType.entities';
import { RealstateTypeServices } from './Services/RealstateType.services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, CalendarModule, ToastModule, ButtonModule, RippleModule, ConfirmPopupModule],
    templateUrl: 'realState_type.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'RealStateTypecomponent' },
    providers: [MessageService, ConfirmationService]
})
export class RealStateTypecomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private messageService: MessageService, private realstateTypeServices: RealstateTypeServices, private confirmationService: ConfirmationService, private realStateService: RealStateService) { }

    realstates_types: RealstateType[];

    ngOnInit() {
        this.realstateTypeServices.FindAll().then(
            res => {
                this.realstates_types = res as RealstateType[];
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
                this.realStateService.FindByType(id).then(
                    res => {
                        if (res) {
                            let realstate = res as RealState;
                            this.realStateService.Delete(Number(realstate.id)).then(
                                res => {
                                    this.realstateTypeServices.Delete(id).then(
                                        res => {
                                            if (res == true) {
                                                location.reload();
                                            } else {
                                                this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Delete Failed !', life: 3000 });
                                            }
                                        },
                                        error => {
                                            console.log(error);
                                        }
                                    );
                                },
                                err => {
                                    console.log(err);
                                }
                            );
                        }else{
                            this.realstateTypeServices.Delete(id).then(
                                res => {
                                    if (res == true) {
                                        this.ngOnInit();
                                    } else {
                                        this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Delete Failed !', life: 3000 });
                                    }
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        }

                    },
                    err => {
                        console.log(err);
                    }
                )
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
}
