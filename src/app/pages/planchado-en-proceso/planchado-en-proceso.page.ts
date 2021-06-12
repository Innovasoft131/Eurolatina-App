import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, IonList, LoadingController, MenuController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ProcesosService } from 'src/app/service/procesos.service';
import { ModalProcesosInfoPage } from '../modal-procesos-info/modal-procesos-info.page';

@Component({
  selector: 'app-planchado-en-proceso',
  templateUrl: './planchado-en-proceso.page.html',
  styleUrls: ['./planchado-en-proceso.page.scss'],
})
export class PlanchadoEnProcesoPage implements OnInit {
  perfil: string= localStorage.getItem('perfil')
  @ViewChild('listas') lista: IonList;
  loading: HTMLIonLoadingElement;
  procesoss= [];
  ver=false;
  colores=[]
  listItems: Array<string> = [];
   lis: string
   bool=false;
   combinacion=false
  constructor(private barcodeScanner: BarcodeScanner,
              private router: Router,
              private menu: MenuController,
              private popoverctrl: PopoverController,
              private loadingController: LoadingController,
              private servicio: ProcesosService,
              private navCtrl: NavController,
              private alertController: AlertController,
              private toast: ToastController,
              private alert: AlertController,
              private modal: ModalController) { }

  ngOnInit() {
     this.presentLoading()
    setTimeout(()=>{
      this.getProcesosPlanchado()
      this.loading.dismiss()
    },500)
  }
  ionViewDidEnter(){
    this.procesoss=[]
    this.presentLoading()
    setTimeout(()=>{
      this.getProcesosPlanchado()
      this.loading.dismiss()
    },500)
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Datos...',
      duration: 500
    });
    await this.loading.present();
  }
  getProcesosPlanchado(){
    this.procesoss=[]
    this.servicio.getProcesosPlanchadoP(localStorage.getItem('idMaquina')).subscribe((respuesta: any)=>{
      console.log(respuesta)
      this.procesoss=[]
      if (respuesta['length']==0) {
        this.ver=true
       } else { 
         this.ver=false
         respuesta.forEach(element => {
          this.servicio.getCantidadRecibidaP(element['id']).subscribe(r=>{
             if(r[0]['cantidadRestante']==null){
               this.procesoss.push({
                 "id": element['id'],
                 "idpedido": element['idPedido'],
                 "fecha_pedido": element['fecha_pedido'],
                 "nombre_pieza" : element['nombre_pieza'],
                 "talla": element['talla'],
                 "cantidad_maquina": element['cantidadInicio'],
                 "color": element['color'],
                 "idColores": element['idColores'],
                 "cantidadRestante": 0,
                 "porcentaje": 0,
                 "colorB": "primary",
                 "idsegundoModulo": element['idsegundoModulo']
                });
             }else{
               if (r[0]['cantidadRestante']==element['cantidadInicio'] ) {
                 this.procesoss.push({
                   "id": element['id'],
                   "idpedido": element['idPedido'],
                   "fecha_pedido": element['fecha_pedido'],
                   "nombre_pieza" : element['nombre_pieza'],
                   "talla": element['talla'],
                   "cantidad_maquina": element['cantidadInicio'],
                   "color": element['color'],
                   "idColores": element['idColores'],
                   "cantidadRestante": r[0]['cantidadRestante'],
                   "porcentaje": '1',
                   "colorB": "success",
                   "idsegundoModulo": element['idsegundoModulo']
                  });
               } else {
                 this.procesoss.push({
                   "id": element['id'],
                   "idpedido": element['idPedido'],
                   "fecha_pedido": element['fecha_pedido'],
                   "nombre_pieza" : element['nombre_pieza'],
                   "talla": element['talla'],
                   "cantidad_maquina": element['cantidadInicio'],
                   "color": element['color'],
                   "idColores": element['idColores'],
                   "cantidadRestante": r[0]['cantidadRestante'],
                   "porcentaje": '0.'+(r[0]['cantidadRestante']*100)/element['cantidadInicio'],
                   "colorB": "primary",
                   "idsegundoModulo": element['idsegundoModulo']
                  });
               }
             }
         }) 
       });
       }
     
    })
  } 
  scan() { 
    this.barcodeScanner  
      .scan()
      .then((barcodeData) => {
        localStorage.setItem('idlinea',barcodeData.text)
        this.navCtrl.navigateForward('/planchado/planchado-maquinas/'+barcodeData.text);
        })
      .catch((err) => {
        this.navCtrl.navigateForward('/planchado/planchado-maquinas/1');
       })      
  }
  mostrar(){
    if(this.perfil=="Especial"){
      this.menu.enable(true, 'especial');
      this.menu.open('especial');
    }else{
      if (this.perfil=="Tejedor" || this.perfil=="Control_de_calidad") {
        this.menu.enable(true, 'tejedor');
        this.menu.open('tejedor');
      }
    } 
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverctrl.create({
      component: PopOverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  agregarPiezas(item){
    this.presentAgregarPiezas(item)
  }
  async presentAgregarPiezas(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Piezas Recojidas',
      message: "Planchado",
      inputs: [
        {
          name: 'name1',
          type: 'text' ,
          placeholder: 'Cantidad piezas ',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.lista.closeSlidingItems();
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            if(alertData.name1){
              const h=parseInt(item.cantidadRestante)+parseInt(alertData.name1)
              if (h<= item.cantidad_maquina) {
                this.servicio.insertarPiezasTomadasP(item.id,alertData.name1).subscribe(respuesta=>{
                })
                this.servicio.agregarPiezas(item.id, alertData.name1).subscribe(respuesta=>{
                }) 
                this.lista.closeSlidingItems();
                this.getProcesosPlanchado()
              } else {
                this.presentToast('cantidad supera lo asignado a la maquina')
              }
              this.lista.closeSlidingItems();
            }
            else{
              this.presentToast('No se Agrego una cantidad')
              this.lista.closeSlidingItems();
            }
            
          }
        }
      ]
    });
    await alert.present();
  }
  TerminarProceso(item, index: number){
   if (item.cantidad_maquina == item.cantidadRestante) {
    this.procesoss.splice(index,1);
    this.servicio.modificarEstadoS(item.idsegundoModulo).subscribe(respuesta=>{
      this.servicio.modificarCantidadTM(item.id).subscribe(respuesta=>{
         console.log(respuesta)
      })
      this.presentToast("Proceso Terminado con Exito")
    })
   } else {
    this.presentAlert(item.cantidad_maquina, item.cantidadRestante)
   }
   
   this.lista.closeSlidingItems();
  }
  async presentAlert(cantidad_maquina: string, cantidadRestante: string ) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      message: 'Falta agregar:'+" "+ (parseInt(cantidad_maquina)-parseInt(cantidadRestante))+"  "+"piezas para poder terminar el proceso",
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
    this.lista.closeSlidingItems();
  }
  async presentToast(msn: string) {
    const toast = await this.toast.create({
      message: msn,
      duration: 2000
    });
    toast.present(); 
  }
   problema(item){
    this.presentModal(item);
    this.lista.closeSlidingItems();
  }
  async presentModal(item) {
    const modal = await this.modal.create({
      component: ModalProcesosInfoPage,
      componentProps:{ idPedido: item.idpedido, 
                       idSegundoModulo: item.id},
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modal.getTop()
    });
    return await modal.present();
  }
  defectos(item){
    this.presentAgregarDefectuosas(item.id)
  }
  async presentAgregarDefectuosas(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Defectuosas',
      message: "Planchado",
      inputs: [
        {
          name: 'name1',
          type: 'text' ,
          placeholder: 'Cantidad',
        },
        {
          name: 'name2',
          type: 'textarea' ,
          placeholder: 'descripcion',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.lista.closeSlidingItems();
          }
        }, {
          text: 'Ok', 
          handler: (alertData) => {
            if (alertData.name1 && alertData.name2) {
              this.servicio.defectuosasTM(id).subscribe(respuesta=>{
                this.servicio.cantDefecto(respuesta['result']['idDefectuosas'],alertData.name1,alertData.name2).subscribe(respuesta=>{
            
                }) 
              })
              this.lista.closeSlidingItems(); 
            } else {
              console.log('no trae algo')
            }
          }
        }
      ]
    });
    await alert.present();
  }
  combinaciones(color: string){
    var com=color.slice(0,11);
      if (com==="Combinación") {
        this.combinacion=true
        return this.combinacion
      } else {
        this.combinacion=false
        return this.combinacion
      }
    }
    verColores(id: string){
      console.log(id)
      this.servicio.getColorSM(id).subscribe((respuesta: any)=>{
        this.colores=respuesta
        this.presentConfirm()
      })
    }
    async presentConfirm() {
      var options = {
        title: 'Combinacion',
        message: 'Colores asignados',
        cssClass: "alertDanger",
        inputs: [],
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log(data);
            }
          }
        ]
      };
  
      options.inputs = [];
  
      // Now we add the radio buttons
      for(let i=0; i< this.colores.length; i++) {
        options.inputs.push({ value: this.colores[i].nombre, disabled: this.bool});
      }
    
      const alert = await this.alert.create(options);
       alert.present();
    }
}
