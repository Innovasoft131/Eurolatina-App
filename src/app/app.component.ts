import { Component, OnInit } from '@angular/core';
import {
  PushNotificationSchema,
  PushNotifications,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/push-notifications';
import { ProcesosService } from './service/procesos.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private servicio: ProcesosService) {}
  ngOnInit() {
    console.log('Initializing HomePage')
 }
 pausar(){
  this.servicio.pausarProcesos().subscribe(respuesta=>{
   console.log(respuesta)
  })
}
activar(){
  this.servicio.reanudarProcesos().subscribe(respuesta=>{
    console.log(respuesta)
  })
}
}
