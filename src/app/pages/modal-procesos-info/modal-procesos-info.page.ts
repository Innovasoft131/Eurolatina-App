import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProcesosService } from '../../service/procesos.service'
@Component({
  selector: 'app-modal-procesos-info',
  templateUrl: './modal-procesos-info.page.html',
  styleUrls: ['./modal-procesos-info.page.scss'],
})
export class ModalProcesosInfoPage implements OnInit {
  problemas= null;
  problemText:string
  idproblema: string
  @Input() idPedido: string;
  @Input() idSegundoModulo: string;
  public fish: string;
  public bandera: string;
  constructor(private modal:ModalController,
              private servico: ProcesosService,
              private toast: ToastController) { }

  ngOnInit() {
    this.obtenerProblemas()
  }
  salirModal(){
    this.modal.dismiss()
  }
  obtenerProblemas(){
    this.servico.getProblemas("problemas").subscribe(respuesta=>{
      this.problemas=respuesta
    })
   }
   reportarProblema(){
    this.servico.insertarProblema(this.idPedido, this.idSegundoModulo, localStorage.getItem('idusuario')).subscribe(respuesta=>{
        this.servico.insertarProblemaDesglose(respuesta['result']['idProblemaProceso'],this.idproblema, this.problemText).subscribe(r=>{
          this.presentToast("Problema Reportado")
        });
    })
    this.modal.dismiss();
  }
  fishyHandler(event) {
    this.fish = event.target.value;
  }

  onProvinceChanged($event){
    this.idproblema= $event.target.value
  }
  async presentToast(msn: string) {
    const toast = await this.toast.create({
      message: msn,
      duration: 2000
    });
    toast.present();
  }

}
