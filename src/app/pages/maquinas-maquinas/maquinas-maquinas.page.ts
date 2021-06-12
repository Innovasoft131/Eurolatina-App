import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoadingController, MenuController, NavController, PopoverController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ProcesosService } from 'src/app/service/procesos.service';

@Component({
  selector: 'app-maquinas-maquinas',
  templateUrl: './maquinas-maquinas.page.html',
  styleUrls: ['./maquinas-maquinas.page.scss'],
})
export class MaquinasMaquinasPage implements OnInit {
  perfil: string= localStorage.getItem('perfil')
  maquinas = [] 
  loading: HTMLIonLoadingElement;
  id;
  ver=false;
  constructor(private popoverctrl: PopoverController,
              private menu: MenuController,
              private barcodeScanner: BarcodeScanner,
              private router: Router,
              private servicio: ProcesosService,
              private loadingController: LoadingController,
              private navCtrl: NavController,
              private route: ActivatedRoute) { }

  async presentLoading() {
    this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando Datos...',
        duration: 1000
    });
    await this.loading.present();
  }
  ngOnInit() {
    this.maquinas=[]
   this.id = this.route.snapshot.paramMap.get('id');
    this.presentLoading()
    setTimeout(()=>{
      this.obtenerMaquinas(this.id)
      this.loading.dismiss()
    },500)
  }

  ionViewDidEnter(){
    this.maquinas=[]
    this.id = this.route.snapshot.paramMap.get('id');
    this.presentLoading()
    setTimeout(()=>{
      this.obtenerMaquinas(this.id)
      this.loading.dismiss()
    },500)
  }  
  obtenerMaquinas(id: string){
   this.servicio.getMaquinaLinea(id).subscribe((respuesta:any)=>{
     if (respuesta['status']=='error') {
      this.ver=true
     } else {
       this.ver=false
       this.maquinas = respuesta
     }
   })
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
  doReorder(event: any){
    event.detail.complete();
  }
  obtenermaquina(item){
     localStorage.setItem('idMaquina',item.idMaquina)
    this.router.navigate(['/maquinas/maquinas-asignados']) 
  }
  scan() {
    this.barcodeScanner 
      .scan()
      .then((barcodeData) => {
        localStorage.setItem('idlinea',barcodeData.text)
        this.navCtrl.navigateForward('/maquinas/maquinas-maquinas/'+barcodeData.text);
          
        }) 
      .catch((err) => {
             localStorage.setItem('idlinea','4')
             this.navCtrl.navigateForward('/maquinas/maquinas-maquinas/4');
       })      
  }
}
