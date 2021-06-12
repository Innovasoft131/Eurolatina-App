import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ProcesosService } from 'src/app/service/procesos.service';

@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.page.html',
  styleUrls: ['./problemas.page.scss'],
})
export class ProblemasPage implements OnInit {
  perfil: string= localStorage.getItem('perfil')
  problemas= null;
  problemText:string
  idproblema: string ="";
  public fish: string;
  public bandera: string;
  constructor(private menu: MenuController,
              private popoverctrl: PopoverController,
              private servico: ProcesosService,
              private modal: ModalController,
              private toast: ToastController) { }

  ngOnInit() {
    this.obtenerProblemas()
  }
  obtenerProblemas(){
    this.servico.getProblemas("problemas").subscribe(respuesta=>{
      this.problemas=respuesta
    })
   }
   reportarProblema(){
    this.servico.insertarProblema("", "", localStorage.getItem('idusuario')).subscribe(respuesta=>{
      console.log("insertar problema")
        this.servico.insertarProblemaDesglose(respuesta['result']['idProblemaProceso'],this.idproblema, this.problemText).subscribe(r=>{
          console.log("insertar problema desglose")
          this.presentToast('Problema Reportado')
        });
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
  fishyHandler(event) {
    this.fish = event.target.value;
    console.log("ffifi", this.fish)
  }

  onProvinceChanged($event){
    this.idproblema= $event.target.value
  }

  leaveFish(event) {
    console.log('bye', event.target.value)
  }
  
  goFish(event) {
    this.idproblema= event.target.value
    console.log('hello ', event.target.value);
  }
  async presentToast(msn: string) {
    const toast = await this.toast.create({
      message: msn,
      duration: 2000
    });
    toast.present();
  }
}
