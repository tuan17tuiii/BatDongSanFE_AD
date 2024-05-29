import { Routes } from '@angular/router';
import { Indexcomponet } from './index.component';
import { Logincomponet } from './login.component';
import { Chartjscomponent } from './chartjs.componet';
import path from 'node:path';
import { Component } from '@angular/core';
import { Basictablecomponent } from './basic_table.component';
import { LayoutComponent } from './layout.component';
import { Basic_elementscomponent } from './basic_elements.componet';
import { MidComponent } from './mdi.component';
import { register } from 'node:module';
import { RegisterComponent } from './register.component';
import { VerifyWebComponent } from './VerifyWeb.component';
import { Informationcomponent } from './Information.component';
import { UsersListcomponent } from './UsersList.component';
import { AdminsListcomponent } from './AdminsList.component';
import { EditUsercomponent } from './EditUser.component';
import { EditAdmincomponent } from './EditAdmin.component';
import { NewsComponent } from './news.component';
import { AdminSecurity } from './Services/Security.Services';
import { ADscomponet } from './ADs.component';
import { AddADsComponent } from './AddADs.component';
import { EditADsComponent } from './EditADs.component';


export const routes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,
        canActivate: [AdminSecurity],
        data: {
            role: 'admin'
        },
        children: [
            {
                path: 'home',
                component: Indexcomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'chartjs',
                component: Chartjscomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'basic_elements',
                component: Basic_elementscomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'basic_table',
                component: Basictablecomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'icon',
                component: MidComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'info',
                component: Informationcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'UsersList',
                component: UsersListcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'AdminsList',
                component: AdminsListcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'edit-user',
                component: EditUsercomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'edit-admin',
                component: EditAdmincomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'ADs',
                component: ADscomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'AddADs',
                component: AddADsComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'edit-ads',
                component: EditADsComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
            },
            {
                path: 'blognews',
                component: NewsComponent
            },
        ]
    },
    {
        path: "",
        component: Logincomponet
    },

    {
        path: 'verify',
        component: VerifyWebComponent
    },
];
