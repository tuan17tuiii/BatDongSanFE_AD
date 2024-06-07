import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './Services/User.Services';
import { Transaction } from './Entities/Transaction.entities';
import { TransactionServices } from './Services/Transaction.services';
import { User } from './Entities/User.entities';
import { CalendarModule } from 'primeng/calendar';
import { formatDate } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RealState } from './Entities/realstate.entities';
import { RealStateService } from './Services/realstate.services';
import { RealstateType } from './Entities/RealstateType.entities';
import { RealstateTypeServices } from './Services/RealstateType.services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, TableModule, CalendarModule, ToastModule, ButtonModule, RippleModule, ConfirmPopupModule],
    templateUrl: 'Edit_cat.component.html',
    styleUrl: './app.component.css',
    host: { 'collision-id': 'Edit_catcomponent' },
    providers: [MessageService, ConfirmationService]
})
export class Edit_catcomponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private messageService: MessageService, private realstateTypeServices: RealstateTypeServices, private confirmationService: ConfirmationService, private realStateService: RealStateService, private activatedRoute: ActivatedRoute) { }

    EditcatForm: FormGroup;
    RealstateType: RealstateType;

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(a =>{
            let id = a.get('id');
            this.realstateTypeServices.findById(Number(id)).then(
                res =>{
                    if (res) {
                        let realstate_type: RealstateType = res as RealstateType;
                        this.RealstateType = realstate_type;
                        this.EditcatForm = this.formBuilder.group({
                            id: realstate_type.id,
                            type: [realstate_type.type,[Validators.required]]
                        });
                    }
                }, 
                err =>{
                    console.log(err);
                }
            )
        });
    }

    Update(){
        let realstate_type: RealstateType = this.EditcatForm.value as RealstateType;

        this.realstateTypeServices.Update(realstate_type).then(
            res =>{
                if(res){
                    this.router.navigate(['realstate_cat']);
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Update Failed !', life: 3000 });
                }
            },
            err =>{
                console.log(err);
            }
        )
    };
}
