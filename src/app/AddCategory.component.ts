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
import { RealstateTypeServices } from './Services/RealstateType.services';
import { RealstateType } from './Entities/RealstateType.entities';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, CalendarModule, ToastModule, ButtonModule, RippleModule],
    templateUrl: 'AddCategory.component.html',
    host: { 'collision-id': 'AddCategoryComponent' },
    providers: [MessageService]
})
export class AddCategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private messageService: MessageService, private realstateTypeServices: RealstateTypeServices) { }

    AddCatForm: FormGroup;


    ngOnInit() {
        this.AddCatForm = this.formBuilder.group({
            type: ['', [Validators.required]]
        });

    };

    Create() {
        let realstatetype: RealstateType = this.AddCatForm.value as RealstateType;
        console.log(realstatetype);
        this.realstateTypeServices.Create(realstatetype).then(
            res => {
                if (res) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Create Advertisement Successed !', key: 'tl', life: 2000 });
                    this.AddCatForm.reset();
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Create Realstate Type Failed !', key: 'tl', life: 2000 });
                }

            },
            err => {
                console.log(err);
            }
        )
    }
};
