import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'maquinas',
    loadChildren: () => import('./pages/maquinas/maquinas.module').then( m => m.MaquinasPageModule)
  },
  {
    path: 'planchado',
    loadChildren: () => import('./pages/planchado/planchado.module').then( m => m.PlanchadoPageModule)
  },
  {
    path: 'maquinas-asignados',
    loadChildren: () => import('./pages/maquinas-asignados/maquinas-asignados.module').then( m => m.MaquinasAsignadosPageModule)
  },
  {
    path: 'maquinas-en-proceso',
    loadChildren: () => import('./pages/maquinas-en-proceso/maquinas-en-proceso.module').then( m => m.MaquinasEnProcesoPageModule)
  },
  {
    path: 'planchado-asignados',
    loadChildren: () => import('./pages/planchado-asignados/planchado-asignados.module').then( m => m.PlanchadoAsignadosPageModule)
  },
  {
    path: 'planchado-en-proceso',
    loadChildren: () => import('./pages/planchado-en-proceso/planchado-en-proceso.module').then( m => m.PlanchadoEnProcesoPageModule)
  },
  {
    path: 'maquinas-maquinas',
    loadChildren: () => import('./pages/maquinas-maquinas/maquinas-maquinas.module').then( m => m.MaquinasMaquinasPageModule)
  },
  {
    path: 'planchado-maquinas',
    loadChildren: () => import('./pages/planchado-maquinas/planchado-maquinas.module').then( m => m.PlanchadoMaquinasPageModule)
  },
  {
    path: 'modal-procesos-info',
    loadChildren: () => import('./pages/modal-procesos-info/modal-procesos-info.module').then( m => m.ModalProcesosInfoPageModule)
  },
  {
    path: 'problemas',
    loadChildren: () => import('./pages/problemas/problemas.module').then( m => m.ProblemasPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
