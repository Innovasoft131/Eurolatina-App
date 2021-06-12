import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanchadoPage } from './planchado.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/planchado/planchado-maquinas',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PlanchadoPage,
    children:[
      {
        path:"planchado-asignados",
        loadChildren:()=>import('../planchado-asignados/planchado-asignados.module').then(m=>m.PlanchadoAsignadosPageModule)
      },
      {
        path:"planchado-en-proceso",
        loadChildren:()=>import('../planchado-en-proceso/planchado-en-proceso.module').then(m=>m.PlanchadoEnProcesoPageModule)
      },
      {
        path:"planchado-maquinas",
        loadChildren:()=>import('../planchado-maquinas/planchado-maquinas.module').then(m=>m.PlanchadoMaquinasPageModule)
      },
      {
        path:"planchado-maquinas/:id",
        loadChildren:()=>import('../planchado-maquinas/planchado-maquinas.module').then(m=>m.PlanchadoMaquinasPageModule)
      }
  ] 
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanchadoPageRoutingModule {}
