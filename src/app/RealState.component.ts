import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { TableModule } from 'primeng/table';
import { Transaction } from './Entities/Transaction.entities';
import { TransactionServices } from './Services/Transaction.services';
import { User } from './Entities/User.entities';
import { CalendarModule } from 'primeng/calendar';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RealState } from './Entities/realstate.entities';
import { RealStateService } from './Services/realstate.services';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, CalendarModule, ToastModule, ButtonModule, RippleModule],
    templateUrl: 'RealState.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'RealStatecomponent' },
    providers: [MessageService]
})
export class RealStatecomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private realStateService: RealStateService, private messageService: MessageService, private userService: UserServices) { }

    realstates: RealState[];
    sellerNames: { [key: number]: string } = {};

    ngOnInit() {
        this.userService.FindAll().then(
            res => {
                let sellers: User[] = res as User[];
                sellers.forEach(seller => {
                    this.sellerNames[seller.id] = seller.username;
                });
                this.realStateService.findAll2().then(
                    res => {
                        this.realstates = res as RealState[];
                        console.log(res);
                    },
                    err => {
                        console.log(err);
                    }
                )
            },
            err => {
                console.log(err);
            }
        )
    }

    Search() {

    }

    Active(id: number) {
        this.realStateService.findById(id).then(
            res => {
                if (res) {
                    let realstate = res as RealState;
                    realstate.status = true;
                    this.realStateService.Update(realstate).then(
                        res => {
                            if (res == true) {
                                this.ngOnInit();
                            };
                        },
                        err => {
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
        this.realStateService.findById(id).then(
            res => {
                if (res) {
                    let realstate = res as RealState;
                    realstate.status = false;
                    this.realStateService.Update(realstate).then(
                        res => {
                            if (res == true) {
                                this.ngOnInit();
                            };
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
