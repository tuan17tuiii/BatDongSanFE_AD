import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { TableModule } from 'primeng/table';
import { User } from './Entities/User.entities';
import { CalendarModule } from 'primeng/calendar';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RealState } from './Entities/realstate.entities';
import { RealStateService } from './Services/realstate.services';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, CalendarModule, ToastModule, ButtonModule, RippleModule, TooltipModule, FloatLabelModule, InputTextModule],
    templateUrl: 'RealState.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'RealStatecomponent' },
    providers: [MessageService]
})
export class RealStatecomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private realStateService: RealStateService, private messageService: MessageService, private userService: UserServices) { }

    realstates: RealState[];
    sellerNames: { [key: number]: string } = {};
    Searchtitle: string;

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
                    this.userService.findById(realstate.usersellId).then(
                        res => {
                            let user = res as User


                            let createdAt = new Date()
                            let createdEnd = new Date()
                            realstate.createdAt = formatDate(createdAt, 'dd/MM/yyyy', 'en-US')
                            if (user.advertisement == null) {
                                createdEnd.setDate(createdAt.getDate() + 1)
                                realstate.createdEnd = formatDate(createdEnd, 'dd/MM/yyyy', 'en-US'); // định dạng ngày hôm nay
                            } else {
                                createdEnd.setDate(createdAt.getDate() + user.advertisement.quantityDates)
                                realstate.createdEnd = formatDate(createdEnd, 'dd/MM/yyyy', 'en-US');
                            }

                            realstate.status = true;
                            realstate.sold = false;
                            realstate.expired = false;
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
                    )


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

    SearchTitle(){
        this.realStateService.searchByTitle(this.Searchtitle).then(
            res =>{
                this.realstates = res as RealState[];
            },
            err =>{
                console.log(err);
                this.ngOnInit();
            }
        )
    }
}
