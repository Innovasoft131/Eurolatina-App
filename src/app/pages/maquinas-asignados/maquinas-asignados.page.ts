import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, IonList, LoadingController, MenuController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ProcesosService } from 'src/app/service/procesos.service';

@Component({
  selector: 'app-maquinas-asignados',
  templateUrl: './maquinas-asignados.page.html',
  styleUrls: ['./maquinas-asignados.page.scss'],
})
export class MaquinasAsignadosPage implements OnInit {
  perfil: string= localStorage.getItem('perfil')
  argumrnto= null;
  procesoss= [];
  loading: HTMLIonLoadingElement;
  combinacion=false
  @ViewChild('listas') lista: IonList;
  ver=false;
  colores=[]
  listItems: Array<string> = [];
   lis: string
   bool=false;
  constructor(private popoverctrl: PopoverController,
              private menu: MenuController,
              private loadingController: LoadingController,
              private procesos: ProcesosService,
              private barcodeScanner: BarcodeScanner,
              private router: Router,
              private toast: ToastController,
              private navCtrl: NavController,
              private alertcon: AlertController) { }
  ngOnInit() {
    this.presentLoading()
    setTimeout(()=>{
      this.llenadoLista()
      this.loading.dismiss()
    },500)
    
  }  
  ionViewDidEnter(){
    this.presentLoading()
    setTimeout(()=>{
      this.llenadoLista()
      this.loading.dismiss()
    },500)
  } 
  llenadoLista(){
    this.procesos.getProcesos(localStorage.getItem('idMaquina')).subscribe((respuesta: any)=>{
      console.log(respuesta)
        if (respuesta['status']=='error') {
          this.ver=true
         } else { 
           this.ver=false
           this.procesoss = respuesta 
         }
     }); 
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
  scan() {
    this.barcodeScanner 
      .scan()
      .then((barcodeData) => {
        localStorage.setItem('idlinea',barcodeData.text)
        this.navCtrl.navigateForward('/maquinas/maquinas-maquinas/'+ barcodeData.text);
        })
      .catch((err) => {
        localStorage.setItem('idlinea','1')
        this.navCtrl.navigateForward('/maquinas/maquinas-maquinas/1');
       })     
  }
  IniciarProceso(item, index: number){
    console.log(item)
     const arreglo={
      id: "",
      accion: "insert",
      idPrimerModulo: item.idPrimerModulo,
      idPedido: item.idPedido,
      idMaquinaProceso: item.idMaquinaProceso,
      idPieza: item.idPieza,
      idColor: item.idColor,
      idTalla: item.idTalla,
      idPrimerModuloD: item.id,
      descripcio: "",
      idUsuario: localStorage.getItem('idusuario'),
      CantidadRecibida: item.cantidad_pieza,
      cantidadInicio: item.cantidad_pieza, 
      cantidadFinal: item.cantidad_pieza,
      fechainicio: "",
      fechaFin: "",
      fusion: "",
      estado: "0"
    }
    this.procesos.insertarSegundoModulo(arreglo).subscribe(respuesta=>{
      this.procesos.insertTercerModulo(item, respuesta['result']['idSegundoModulo']).subscribe(res=>{
        console.log("inserte tercer modulo",res)
       this.procesoss.splice(index,1);
       this.presentToast('Proceso Iniciado');
      })
       this.procesos.modificarEstado(item.idMaquinaProceso).subscribe(respuesta=>{
        
        })
    }) 

    this.lista.closeSlidingItems();
  }
  async presentToast(msn: string) {
    const toast = await this.toast.create({
      message: msn,
      duration: 2000
    });
    toast.present();
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
    this.listItems = [];
    this.procesos.getColorSM(id).subscribe((respuesta: any)=>{
      console.log(respuesta)
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
  
    const alert = await this.alertcon.create(options);
     alert.present();
  }
  }

