import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ProcesosService } from '../service/procesos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario:string;
  tipo: string;
  clave:string;
  status: string;
  _showpassword= false
  _passwordToggleIcon= 'eye'
  perfil: boolean=false;

  constructor(private servicio: ProcesosService,
              private nav: NavController,
              private toast: ToastController,
              private alert: AlertController) {}

  verContra():void{
    this._showpassword= !this._showpassword
    if (this._passwordToggleIcon == 'eye') {
      this._passwordToggleIcon = 'eye-off'
    } else {
      this._passwordToggleIcon = 'eye'
    }
  }

  validar(){
   if(this.usuario && this.clave){
      this.servicio.logear(this.usuario, this.clave).subscribe(respuesta=> {
        if(respuesta['result']['idUsuario']){
          if (respuesta['result']['estado']==1) {
            localStorage.setItem('idusuario',respuesta['result']['idUsuario'])
            localStorage.setItem('perfil',respuesta['result']['perfil'])
             if (respuesta['result']['perfil']=="Especial") {
              this.nav.navigateForward(['maquinas']);
             }
             if (respuesta['result']['perfil']=="Tejedor") {
                 this.nav.navigateForward(['maquinas']);
             } 
             if (respuesta['result']['perfil']=="Control_de_calidad") {
              this.nav.navigateForward(['planchado']);
             }
          } else {
            this.presentToast("Usuario no activado")
          }
          
        }else{
          this.presentToast(respuesta['result']['error_smg']);
        }
      });
    }else{
      this.presentAlert();
    }
  }
  async presentToast(msn: string) {
    const toast = await this.toast.create({
      message: msn,
      duration: 2000
    });
    toast.present();
  }
  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      message: 'Campos sin llenar',
      buttons: [
       {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
