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
    constructor(private formBuilder: FormBuilder, private transactionServices: TransactionServices, private router: Router, private userServices: UserServices, private messageService: MessageService) { }

    transactions: Transaction[];
    buyerNames: { [key: number]: string } = {};
    sellerNames: { [key: number]: string } = {};
    From: string;
    To: string;

    ngOnInit() {
        // Fetch buyer names
        this.userServices.FindAll().then(
            res => {
                let buyers: User[] = res as User[];
                buyers.forEach(buyer => {
                    this.buyerNames[buyer.id] = buyer.username;
                });
                // Fetch seller names
                this.userServices.FindAll().then(
                    res => {
                        let sellers: User[] = res as User[];
                        sellers.forEach(seller => {
                            this.sellerNames[seller.id] = seller.username;
                        });
                        // Fetch all transactions
                        this.transactionServices.FindAll().then(
                            res => {
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
