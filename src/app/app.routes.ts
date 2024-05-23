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

export const routes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            {
              path: 'home',
                component: Indexcomponet
            }, {
                path: 'chartjs',
                component: Chartjscomponent
            }, {
                path: 'basic_elements',
                component: Basic_elementscomponent
            },
            {
                path: 'basic_table',
                component: Basictablecomponent
            },
            {
                path: 'icon',
                component: MidComponent
            },
            {
                path: 'info',
                component: Informationcomponent
            },
            {
                path: 'UsersList',
                component: UsersListcomponent
            },
            {
                path: 'AdminsList',
                component: AdminsListcomponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'edit-user',
                component: EditUsercomponent
            },
            {
                path: 'edit-admin',
                component: EditAdmincomponent
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
