import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { User } from './Entities/User.entities';
import { RoleServices } from './Services/Role.Services';
import { Role } from './Entities/Role.entities';
import { ADsServices } from './Services/ADs.services';
import { ADs } from './Entities/ADs.entities';
import { CalendarModule } from 'primeng/calendar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: 'EditADs.component.html',
  host: { 'collision-id': 'EditADsComponent' },
})
export class EditADsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private adsServices: ADsServices, private activatedRoute: ActivatedRoute) { }

  AddADsForm: FormGroup;

  msg: string;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(a => {
      let id = a.get('id');
      this.adsServices.FindByID(id).then(
        res => {
          if (res) {
            let ads: ADs = res as ADs;
            this.AddADsForm = this.formBuilder.group({
              id: ads.id,
              advertisementName: ads.advertisementName,
              describe: ads.describe,
              price: ads.price,
              time: ads.time,
              status: ads.status
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    });
  };

  Update() {
    let ads: ADs = this.AddADsForm.value as ADs;
    ads.time = formatDate(ads.time, 'dd/MM/yyyy', 'en-US');

    this.adsServices.Update(ads).then(
      res => {
        if (res['result'] == true) {
          this.msg = "Update Advertisement Successd !";
          this.router.navigate(['/admin/ADs']);
        } else {
          this.msg = "Update Advertisement Failed !";
        }
      },
      err => {
        console.log(err);
      }
    );
  };
};