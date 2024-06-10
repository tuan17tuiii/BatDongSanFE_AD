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
import { ADsServices } from './Services/ADs.services';
import { ADs } from './Entities/ADs.entities';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, CalendarModule, ToastModule, ButtonModule, RippleModule],
    templateUrl: 'Transaction.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'UsersListcomponent' },
    providers: [MessageService]
})
export class Transactioncomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private transactionServices: TransactionServices, private router: Router, private userServices: UserServices, private messageService: MessageService, private adsServices: ADsServices) { }

    transactions: Transaction[];
    User: { [key: number]: string } = {};
    ADS: { [key: number]: string } = {};
    From: string;
    To: string;

    ngOnInit() {
        // Fetch user names
        this.userServices.FindAll().then(
            res => {
                let users: User[] = res as User[];
                users.forEach(user => {
                    this.User[user.id] = user.username;
                });
                // Fetch all ads
                this.adsServices.FindAll().then(
                    res => {
                        let ads: ADs[] = res as ADs[];
                        ads.forEach(ads =>{
                            this.ADS[ads.id] = ads.advertisementName;
                        });
                        // Fetch all transactions
                        this.transactionServices.FindAll().then(
                            res => {
                                console.log(res);
                                this.transactions = res as Transaction[];
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
            },
            err => {
                console.log(err);
            }
        )

    }

    Search() {
        let DateFrom = formatDate(this.From, 'dd-MM-yyyy', 'en-US');
        let DateTo = formatDate(this.To, 'dd-MM-yyyy', 'en-US');

        this.transactionServices.DateRange(DateFrom, DateTo).then(
            res => {
                if (res) {
                    this.transactions = res as Transaction[];
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Search Failed', detail: 'Cannot Find Transaction With The Corresponding Date Range', key: 'tl', life: 2000 });
                }
            },
            err => {
                console.log(err);
            }
        )
    }
}
