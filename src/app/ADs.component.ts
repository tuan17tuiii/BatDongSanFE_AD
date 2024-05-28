import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from './Entities/User.entities';
import { UserServices } from './Services/User.Services';
import { ADs } from './Entities/ADs.entities';
import { ADsServices } from './Services/ADs.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './ADs.component.html',
})
export class ADscomponet implements OnInit {

  constructor(private adsServices: ADsServices, private router: Router) {

  }

  ADs: ADs[];
  msg: string;

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

  delete(id: number) {
    var result = confirm('Are you sure !');
    if (result) {
      this.adsServices.Delete(id).then(
        res => {
          if (res['result'] == true) {
            location.reload();
          } else {
            this.msg = 'Failed !';
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  Active(id: number) {
    this.adsServices.FindByID(String(id)).then(
      res => {
        if (res) {
          let ads = res as ADs;
          ads.status = true;
          this.adsServices.Update(ads).then(
            res => {
              if(res['result'] == true){
                location.reload();
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
              if(res['result'] == true){
                location.reload();
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
}
