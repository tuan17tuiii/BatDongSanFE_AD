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
        ]
    }, 
    {
        path: "",
        component: Logincomponet
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'verify',
        component: VerifyWebComponent
    },
];
