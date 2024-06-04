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
import { ChangePasswordComponent } from './ChangePassword.component';
import { Transactioncomponent } from './Transaction.component';
import { BlogupnewsComponent } from './blogupnew.component';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AdminSecurity],
        data: {
            role: '1'
        },
        children: [
            {
                path: '',
                component: Indexcomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: 'admin'
                },
                
            },
            {
                path: 'home',
                component: Indexcomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
                
            },
            {
                path: 'chartjs',
                component: Chartjscomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'basic_elements',
                component: Basic_elementscomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'basic_table',
                component: Basictablecomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'icon',
                component: MidComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'info',
                component: Informationcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'UsersList',
                component: UsersListcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'AdminsList',
                component: AdminsListcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'edit-user',
                component: EditUsercomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'edit-admin',
                component: EditAdmincomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'ADs',
                component: ADscomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'AddADs',
                component: AddADsComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'edit-ads',
                component: EditADsComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'blognews',
                component: NewsComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'changepass',
                component: ChangePasswordComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'transaction',
                component: Transactioncomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },     {
                path: 'blogupnews',
                component: BlogupnewsComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
        ]
    },
    {
        path: "Login",
        component: Logincomponet
    },

    {
        path: 'verify',
        component: VerifyWebComponent
    },
];
