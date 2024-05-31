import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { TableModule } from 'primeng/table';
import { Transaction } from './Entities/Transaction.entities';
import { TransactionServices } from './Services/Transaction.services';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule],
    templateUrl: 'Transaction.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'UsersListcomponent' },
})
export class Transactioncomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private transactionServices: TransactionServices, private router: Router) { }

    transactions: Transaction[];

    ngOnInit() {
        this.transactionServices.FindAll().then(
            res =>{
                this.transactions = res as Transaction[];
            },
            err =>{
                console.log(err);
            }
        )
    }

}
