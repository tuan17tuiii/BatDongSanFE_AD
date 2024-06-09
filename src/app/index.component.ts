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
import { RealstateType } from './Entities/RealstateType.entities';
import { RealstateTypeServices } from './Services/RealstateType.services';
import { ADsServices } from './Services/ADs.services';
import { ADs } from './Entities/ADs.entities';
import { RealStateService } from './Services/realstate.services';
import { RealState } from './Entities/realstate.entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, CalendarModule, ToastModule, ButtonModule, RippleModule],
  templateUrl: './index.component.html',
  styleUrl: './app.component.css',
  host: { 'collision-id': 'Indexcomponet' },
  providers: [MessageService]
})
export class Indexcomponet implements OnInit {

  constructor(private formBuilder: FormBuilder, private transactionServices: TransactionServices, private router: Router, private userServices: UserServices, private messageService: MessageService, private realstateTypeService: RealstateTypeServices, private adsServices: ADsServices, private realStateService: RealStateService) { }

  username: string;
  avatar: string;
  role: number;
  transactions: Transaction[];
  ADs: ADs[];
  users: User[];
  admins: User[];
  realstates: RealState[];
  realstateTypes: RealstateType[];
  buyerNames: { [key: number]: string } = {};
  sellerNames: { [key: number]: string } = {};
  seller: { [key: number]: string } = {};
  today: string = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  countus: number = 0;
  countad: number = 0;
  counttype: number = 0;
  countActivatedAds: number = 0;
  countDeactivatedAds: number = 0;
  countUnapproved: number = 0;
  countApproved: number = 0;

  ngOnInit() {
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          let user: User = res as User;
          this.username = user.username;
          this.avatar = user.avatar;
          this.role = user.roleId;
        },
        err => {
          console.log(err);
        }
      )
    }

    this.TransactionToday();

    this.NumberOfUser();

    this.NumberOfAdmin();

    this.RealstateType();

    this.Advertisement();

    this.Realstate();
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

  NumberOfUser() {
    this.userServices.FindAllUser().then(
      (res: User[]) => {
        this.users = res.slice(0, 8); // Get the first 5 users
        this.users.forEach(user => {
          this.countus++;
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  NumberOfAdmin() {
    this.userServices.FindAllAdmin().then(
      (res: User[]) => {
        this.admins = res.slice(0, 8); // Get the first 8 users
        this.admins.forEach(admin => {
          this.countad++;
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  RealstateType() {
    this.realstateTypeService.FindAll().then(
      (res: RealstateType[]) => {
        this.realstateTypes = res.slice(0, 8);
        this.realstateTypes.forEach(type => {
          this.counttype++;
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  Advertisement() {
    this.adsServices.FindAll().then(
      (res: ADs[]) => {
        this.ADs = res.slice(0, 8);
        this.ADs.forEach(ads => {
          if (ads.status == true) {
            this.countActivatedAds++;
          } else {
            this.countDeactivatedAds++;
          }
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  Realstate() {
    this.userServices.FindAll().then(
      res => {
        let sellers: User[] = res as User[];
        sellers.forEach(seller => {
          this.sellerNames[seller.id] = seller.username;
        });
        this.realStateService.findAll2().then(
          (res: RealState[]) => {
            this.realstates = res.slice(0, 8);
            this.realstates.forEach(realstate => {
              if (realstate.status == true) {
                this.countApproved++;
              } else {
                this.countUnapproved++;
              }
            });
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
}
