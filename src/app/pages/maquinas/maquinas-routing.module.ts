import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinasPage } from './maquinas.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/maquinas/maquinas-maquinas',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MaquinasPage,
    children:[
      {
        path:"maquinas-asignados",
        loadChildren:()=>import('../maquinas-asignados/maquinas-asignados.module').then(m=>m.MaquinasAsignadosPageModule)
      },
      {
        path:"maquinas-en-proceso",
        loadChildren:()=>import('../maquinas-en-proceso/maquinas-en-proceso.module').then(m=>m.MaquinasEnProcesoPageModule)
      },
      {
        path:"maquinas-maquinas",
        loadChildren:()=>import('../maquinas-maquinas/maquinas-maquinas.module').then(m=>m.MaquinasMaquinasPageModule)
      },
      {
        path:"maquinas-maquinas/:id",
        loadChildren:()=>import('../maquinas-maquinas/maquinas-maquinas.module').then(m=>m.MaquinasMaquinasPageModule)
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinasPageRoutingModule {}
