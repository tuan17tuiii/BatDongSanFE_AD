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
import { Statisticcomponent } from './Statistic.component';
import { RealState } from './Entities/realstate.entities';
import { RealStatecomponent } from './RealState.component';
import { RealStateTypecomponent } from './realstate_type.component';
import { AddCategoryComponent } from './AddCategory.component';
import { Edit_catcomponent } from './Edit_cat.component';
import { AgentsListcomponent } from './AgentList.component';
import { EditAgentcomponent } from './EditAgent.component';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AdminSecurity],
        data: {
            role: '1, 3'
        },
        children: [
            {
                path: '',
                component: Indexcomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
                
            },
            {
                path: 'home',
                component: Indexcomponet,
                canActivate: [AdminSecurity],
                data: {
                    role: '1, 3'
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
                path: 'AgentsList',
                component: AgentsListcomponent,
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
                    role: '3'
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
                path: 'edit-agent',
                component: EditAgentcomponent,
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
            {
                path: 'statistic',
                component: Statisticcomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'realstate',
                component: RealStatecomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'realstate_cat',
                component: RealStateTypecomponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'Addcat',
                component: AddCategoryComponent,
                canActivate: [AdminSecurity],
                data: {
                    role: '1'
                },
            },
            {
                path: 'edit-cat',
                component: Edit_catcomponent,
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
