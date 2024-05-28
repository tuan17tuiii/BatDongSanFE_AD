import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
  imports: [RouterOutlet,RouterLink, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: 'AddADs.component.html',
  host: { 'collision-id': 'AddADsComponent' },
})
export class AddADsComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private router: Router, private adsServices: ADsServices){}

  AddADsForm: FormGroup;
  msg: string;
  

  ngOnInit(){
    this.AddADsForm = this.formBuilder.group({
        advertisementName: ['',[Validators.required]],
        describe: ['',[Validators.required]],
        price: ['',[Validators.required]],
        time: [new Date(),[Validators.required]],
        status: false
    });

  };

  Create(){
    let ads: ADs = this.AddADsForm.value as ADs;
    ads.time = formatDate(ads.time, 'dd/MM/yyyy', 'en-US');

    this.adsServices.Create(ads).then(
        res =>{
            console.log(ads);
            if (res['result'] == true) {
                this.msg = "Create Advertisement Successd !";
                location.reload();
            }else{
                this.msg = "Create Advertisement Failed !";
            }
        },
        err =>{
            console.log(err);
        }
    );
  };
};
