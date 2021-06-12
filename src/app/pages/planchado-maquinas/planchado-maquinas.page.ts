import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ProcesosService } from 'src/app/service/procesos.service';

@Component({
  selector: 'app-planchado-maquinas',
  templateUrl: './planchado-maquinas.page.html',
  styleUrls: ['./planchado-maquinas.page.scss'],
})
export class PlanchadoMaquinasPage implements OnInit {
  perfil: string= localStorage.getItem('perfil')
  maquinas = [] 
  id; 
  ver=false;
  constructor(private popoverctrl: PopoverController,
              private menu: MenuController,
              private barcodeScanner: BarcodeScanner,
              private router: Router,
              private servicio: ProcesosService,
              private route: ActivatedRoute,
              private navCtrl: NavController) { }
  ngOnInit() { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.obtenerMaquinas()
  }
  obtenerMaquinas(){
    this.servicio.getMaquinaLineaTM(this.id).subscribe((respuesta:any)=>{
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
    this.router.navigate(['/planchado/planchado-asignados']) 

  }
  scan() {
    this.barcodeScanner  
      .scan()
      .then((barcodeData) => {
        localStorage.setItem('idlinea',barcodeData.text)
        this.navCtrl.navigateForward('/planchado/planchado-maquinas/'+barcodeData.text);
        })
      .catch((err) => {
        localStorage.setItem('idlinea','1')
        this.navCtrl.navigateForward('/planchado/planchado-maquinas/1');
       })      
  }
}
