import { Routes } from '@angular/router';
import { Indexcomponet } from './index.component';
import { Logincomponet } from './login.component';
import { Chartjscomponent } from './chartjs.componet';
import path from 'node:path';
import { Component } from '@angular/core';
import { Basictablecomponent } from './basic_table.component';
import { LayoutComponent } from './layout.component';

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
            }
        ]
    }, 
    {
        path: "login",
        component: Logincomponet
    }

];
