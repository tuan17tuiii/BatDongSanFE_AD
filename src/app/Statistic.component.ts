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
    templateUrl: 'Statistic.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'Statisticcomponent' },
    providers: [MessageService]
})
export class Statisticcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private transactionServices: TransactionServices, private router: Router, private userServices: UserServices, private messageService: MessageService) { }

    transactions: Transaction[];
    users: User[];
    admins: User[];
    buyerNames: { [key: number]: string } = {};
    sellerNames: { [key: number]: string } = {};
    today: string = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
    countus: number = 0;
    countad: number = 0;

    ngOnInit() {
        // Fetch buyer names
        this.TransactionToday();

        this.NumberOfUser();

        this.NumberOfAdmin();
    }

    TransactionToday() {
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
                        this.transactionServices.Today(this.today).then(
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

    NumberOfUser(){
        this.userServices.FindAllUser().then(
            (res: User[]) => {
                this.users = res.slice(0, 8); // Get the first 5 users
                this.users.forEach(user =>{
                    this.countus ++;
                });
            },
            err => {
                console.log(err);
            }
        )
    }

    NumberOfAdmin(){
        this.userServices.FindAllAdmin().then(
            (res: User[]) => {
                this.admins = res.slice(0, 8); // Get the first 8 users
                this.admins.forEach(admin =>{
                    this.countad ++;
                });
            },
            err => {
                console.log(err);
            }
        )
    }
}
