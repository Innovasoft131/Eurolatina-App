import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, IonList, LoadingController, MenuController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ProcesosService } from 'src/app/service/procesos.service';
import { ModalProcesosInfoPage } from '../modal-procesos-info/modal-procesos-info.page';

@Component({
  selector: 'app-maquinas-en-proceso',
  templateUrl: './maquinas-en-proceso.page.html',
  styleUrls: ['./maquinas-en-proceso.page.scss'],
})
export class MaquinasEnProcesoPage implements OnInit {
  perfil: string= localStorage.getItem('perfil')
  argumrnto= null;
  procesoss= []; 
  loading: HTMLIonLoadingElement;
  @ViewChild('listas') lista: IonList;
  ver=false; 
  colores=[]
  listItems: Array<string> = [];
   lis: string
   bool=false;
   combinacion=false
  constructor(private barcodeScanner: BarcodeScanner,
              private router: Router,
              private popoverctrl: PopoverController,
              private menu: MenuController,
              private loadingController: LoadingController,
              private proceso: ProcesosService,
              private toast: ToastController,
              private alertController: AlertController,
              private navCtrl: NavController,
              private alert:AlertController,
              private modal: ModalController) { }

  ngOnInit() {
  }
  scan() {
    this.barcodeScanner 
      .scan()
      .then((barcodeData) => {
        localStorage.setItem('idlinea',barcodeData.text)
        this.navCtrl.navigateForward('/maquinas/maquinas-maquinas/'+ barcodeData.text);
        })
      .catch((err) => {
        localStorage.setItem('idlinea','2')
        this.navCtrl.navigateForward('/maquinas/maquinas-maquinas/2');
       })     
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Datos...',
      duration: 1000
    });
    await this.loading.present();
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
  ionViewDidEnter(){
    this.presentLoading()
    setTimeout(()=>{
      this.llenadoLista()
      this.loading.dismiss()
    },1000)
  } 
  llenadoLista(){
    this.procesoss=[]
    this.proceso.getIdmaquina(localStorage.getItem('idMaquina')).subscribe((respuesta: any)=>{
      console.log(respuesta)
      if (respuesta['status']=='error') {
        this.ver=true
       } else { 
         this.ver=false
         respuesta.forEach(element => {
          this.proceso.getCantidadRecibida(element['id']).subscribe(r=>{
             if(r[0]['cantidadRestante']==null){
               this.procesoss.push({
                 "id": "",
                 "idsegundoModulo":element['id'],
                 "idPedido": element['idPedido'],
                 "fecha_pedido": element['fecha_pedido'],
                 "nombre_pieza" : element['nombre_pieza'],
                 "talla": element['talla'],
                 "cantidad_maquina": element['cantidad_maquina'],
                 "color": element['color'],
                 "cantidadRestante": 0,
                 "porcentaje": 0,
                 "colorB": "primary",
                 "idPrimerModulo": element['idPrimerModulo'],
                 "idMaquinaProceso": element['idMaquinaProceso'],
                 "idPieza": element['idPieza'],
                 "idColor": element['idColor'],
                 "idColores": element['idColores'],
                 "idTalla": element['idTalla'],
                 "idPrimerModuloD": element['idPrimerModuloD'],
                 "descripcio": "",
                 "idUsuario": localStorage.getItem('idusuario'),
                 "CantidadRecibida": element['CantidadRecibida'],
                 "cantidadInicio": element['cantidadInicio'],
                 "cantidadFinal": element['cantidadFinal'],
                 "fechainicio": "",
                 "fechaFin": "",
                 "fusion": "",
                 "estado": "0",
                 "cantidadefectuosas": "0",
                 "accion": "insert",
                });
             }else{
               if (r[0]['cantidadRestante']==element['cantidad_maquina'] ) {
                 this.procesoss.push({
                   "id": "",
                   "idsegundoModulo":element['id'],
                   "idPedido": element['idPedido'],
                   "fecha_pedido": element['fecha_pedido'],
                   "nombre_pieza" : element['nombre_pieza'],
                   "talla": element['talla'],
                   "cantidad_maquina": element['cantidad_maquina'],
                   "color": element['color'],
                   "cantidadRestante": r[0]['cantidadRestante'],
                   "porcentaje": '1',
                   "colorB": "success",
                   "idPrimerModulo": element['idPrimerModulo'],
                 "idMaquinaProceso": element['idMaquinaProceso'],
                 "idPieza": element['idPieza'],
                 "idColor": element['idColor'],
                 "idColores": element['idColores'],
                 "idTalla": element['idTalla'],
                 "idPrimerModuloD": element['idPrimerModuloD'],
                 "descripcio": "",
                 "idUsuario": localStorage.getItem('idusuario'),
                 "CantidadRecibida": element['CantidadRecibida'],
                 "cantidadInicio": element['cantidadInicio'],
                 "cantidadFinal": element['cantidadFinal'],
                 "fechainicio": "",
                 "fechaFin": "",
                 "fusion": "",
                 "estado": "0",
                 "cantidadefectuosas": "0",
                 "accion": "insert"
                  });
               } else {
                 this.procesoss.push({
                  "id": "",
                  "idsegundoModulo":element['id'],
                  "idPedido": element['idPedido'],
                  "fecha_pedido": element['fecha_pedido'],
                  "nombre_pieza" : element['nombre_pieza'],
                  "talla": element['talla'],
                  "cantidad_maquina": element['cantidad_maquina'],
                  "color": element['color'],
                  "cantidadRestante": r[0]['cantidadRestante'],
                  "porcentaje": '0.'+(r[0]['cantidadRestante']*100)/element['cantidad_maquina'],
                  "colorB": "primary",
                  "idPrimerModulo": element['idPrimerModulo'],
                 "idMaquinaProceso": element['idMaquinaProceso'],
                 "idPieza": element['idPieza'],
                 "idColor": element['idColor'],
                 "idColores": element['idColores'],
                 "idTalla": element['idTalla'],
                 "idPrimerModuloD": element['idPrimerModuloD'],
                 "descripcio": "",
                 "idUsuario": localStorage.getItem('idusuario'),
                 "CantidadRecibida": element['CantidadRecibida'],
                 "cantidadInicio": element['cantidadInicio'],
                 "cantidadFinal": element['cantidadFinal'],
                 "fechainicio": "",
                 "fechaFin": "",
                 "fusion": "",
                 "estado": "0",
                 "cantidadefectuosas": "0",
                 "accion": "insert"
                  });
               }
             }
         }) 
       });
       }
        
     });
  }
  async presentToast(msn: string) {
    const toast = await this.toast.create({
      message: msn,
      duration: 2000
    });
    toast.present();
  }
  agregarPiezas(item){
    this.presentAgregarPiezas(item)
  }
  async presentAgregarPiezas(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Piezas Recojidas',
      message: "Maquinas",
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
                this.proceso.insertarPiezasTomadas(item.idsegundoModulo,alertData.name1).subscribe(respuesta=>{
                })
                this.proceso.agregarPiezas(item.idsegundoModulo, alertData.name1).subscribe(respuesta=>{
                })
                this.proceso.modificarCantidadtercermodulo(item.idMaquinaProceso,alertData.name1).subscribe(respuesta=>{
                  console.log(respuesta)
                })
                this.lista.closeSlidingItems();
                this.llenadoLista()
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
    console.log(item)
    if (item.cantidad_maquina == item.cantidadRestante) {
      this.proceso.modificarCantidad(item.idsegundoModulo). subscribe(respuesta=>{
        console.log(respuesta)
         this.procesoss.splice(index,1);
       })
       this.presentToast('Proceso Terminado con exito');
    } else {
      this.presentAlert(item.cantidad_maquina, item.cantidadRestante)
    }
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
  problema(item){
    this.presentModal(item);
    this.lista.closeSlidingItems();
  }
  async presentModal(item) {
    const modal = await this.modal.create({
      component: ModalProcesosInfoPage,
      componentProps:{ idPedido: item.idPedido, 
                       idSegundoModulo: item.id},
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modal.getTop()
    });
    return await modal.present();
  }
  defectos(item){
    this.presentAgregarDefectuosas(item.idsegundoModulo)
  }
  async presentAgregarDefectuosas(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Defectuosas',
      message: "Maquinas",
      inputs: [
        {
          name: 'name1',
          type: 'text' ,
          placeholder: 'Introduce cantidad',
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
              this.proceso.defectuosas(id).subscribe(respuesta=>{
                this.proceso.cantDefecto(respuesta['result']['idDefectuosas'],alertData.name1,alertData.name2).subscribe(respuesta=>{
                  
                })
              })
              this.lista.closeSlidingItems(); 
            } else {
              console.log('no trae algo')
              this.lista.closeSlidingItems();
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
      this.proceso.getColorSM(id).subscribe((respuesta: any)=>{
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
