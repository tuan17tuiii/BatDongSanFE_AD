import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ADsServices } from './Services/ADs.services';
import { ADs } from './Entities/ADs.entities';
import { CalendarModule } from 'primeng/calendar';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, CalendarModule, ToastModule, ButtonModule, RippleModule],
  templateUrl: 'AddADs.component.html',
  host: { 'collision-id': 'AddADsComponent' },
  providers: [MessageService]
})
export class AddADsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private adsServices: ADsServices, private messageService: MessageService) { }

  AddADsForm: FormGroup;
  msg: string;


  ngOnInit() {
    this.AddADsForm = this.formBuilder.group({
      advertisementName: ['', [Validators.required]],
      describe: ['', [Validators.required]],
      price: ['', [Validators.required]],
      time: [new Date(), [Validators.required]],
      status: false
    });

  };

  Create() {
    let ads: ADs = this.AddADsForm.value as ADs;
    ads.time = formatDate(ads.time, 'dd/MM/yyyy', 'en-US');

    this.adsServices.Create(ads).then(
      res => {
        if (res['result'] == true) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Create Advertisement Successed !', key: 'tl', life: 2000 });
          this.AddADsForm.reset();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Create Advertisement Failed !', key: 'tl', life: 2000 });
        }
      },
      err => {
        console.log(err);
      }
    );
  };
};
