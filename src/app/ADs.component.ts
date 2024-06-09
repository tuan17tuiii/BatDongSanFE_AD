import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from './Entities/User.entities';
import { UserServices } from './Services/User.Services';
import { ADs } from './Entities/ADs.entities';
import { ADsServices } from './Services/ADs.services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ButtonModule, ToastModule, ConfirmPopupModule, TableModule, FloatLabelModule, InputTextModule],
  templateUrl: './ADs.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ADscomponet implements OnInit {

  constructor(private adsServices: ADsServices, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  ADs: ADs[];
  msg: string;
  Searchname: string;

  ngOnInit() {
    this.adsServices.FindAll().then(
      res => {
        this.ADs = res as ADs[];
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
      rejectButtonStyleClass: 'p-button-outlined p-button-sm btn btn-danger mr-2',
      acceptButtonStyleClass: 'p-button-sm btn btn-success mr-2',
      accept: () => {
        this.adsServices.Delete(id).then(
          res => {
            if (res['result'] == true) {
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
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });

  }

  Active(id: number) {
    this.adsServices.FindByID(String(id)).then(
      res => {
        if (res) {
          let ads = res as ADs;
          ads.status = true;
          this.adsServices.Update(ads).then(
            res => {
              if (res['result'] == true) {
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
    this.adsServices.FindByID(String(id)).then(
      res => {
        if (res) {
          let ads = res as ADs;
          ads.status = false;
          this.adsServices.Update(ads).then(
            res => {
              if (res['result'] == true) {
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

  SearchName() {
      this.adsServices.searchByName(this.Searchname).then(
        res =>{
          this.ADs = res as  ADs[];
        },
        err =>{
          console.log(err);
          this.ngOnInit();
        }
      )
  }
}
