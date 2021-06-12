import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  url= 'https://administrativa.euro-latina.com.mx/Api-Euro'
  //url = 'https://systemscode.com.mx/Innovasoft/Api-Euro';
  constructor(private http: HttpClient) { }
  logear(usuario:string, contraseña: string){
    const datos = { usuario: usuario, password: contraseña};
    return this.http.post(this.url+'/auth',JSON.stringify(datos));
  }
  getProcesos(id: string){
    return this.http.get(this.url+'/segundoModulo?id='+id);
  }
  getMaquinaLinea(id: string){
    return this.http.get(this.url+'/lineas?idLinea='+id);
  }
  getMaquinaLineaTM(id: string){
    return this.http.get(this.url+'/lineas?id='+id);
  }
  insertarSegundoModulo(obj){
    return this.http.post(this.url+'/segundoModulo', JSON.stringify(obj));
   }
   modificarEstado(id3: string){
    const datos={
      tabla: "maquinasProceso",
      id: "id",
      idPrimerModulo: id3,
      estado: '1'
    }
    return this.http.post(this.url+'/primerModulo', JSON.stringify(datos));
  }
  modificarEstadoTercerModule(idtercermodulo: string){
    const datos={
      tabla: "tercerModulo",
      id: "id",
      idPrimerModulo: idtercermodulo,
      estado: '1'
    }
    return this.http.post(this.url+'/primerModulo', JSON.stringify(datos));
  }
  getIdmaquina(idmaquina: string){
    return this.http.get(this.url+'/segundoModulo?idMaquina='+idmaquina)
  }
  getCantidadRecibida(id: string){
    return this.http.get(this.url+'/segundoModulo?idSegundoModulo='+id)
  }
  getCantidadRecibidaP(id: string){
    return this.http.get(this.url+'/tercerModulo?idTercerModulo='+id)
  }
  insertarPiezasTomadas(id: string, cantidad: string){
    let datos={
     idsegundoModulo: id,
     idtercerModulo: "",
     idUsuario: localStorage.getItem('idusuario'),
     cantidad: cantidad
    }
    return this.http.post(this.url+'/cantidadPiezasTomadas', JSON.stringify(datos))
  }
  insertarPiezasTomadasP(id: string, cantidad: string){
    let datos={
     idsegundoModulo: "",
     idtercerModulo: id,
     idUsuario: localStorage.getItem('idusuario'),
     cantidad: cantidad
    }
    return this.http.post(this.url+'/cantidadPiezasTomadas', JSON.stringify(datos))
  }
  agregarPiezas(id: string, cantidad: string){
    const datos = {
      id : id,
      accion : "modificarCantidadRecibida",
      CantidadRecibida : cantidad
  }
   return this.http.post(this.url+'/segundoModulo', JSON.stringify(datos))
 }
 modificarCantidad(id: string){
  const datos = {
     id : id,
     accion : "modificarCantidad"
 }
 return this.http.post(this.url+'/segundoModulo', JSON.stringify(datos));
 }
 modificarCantidadtercermodulo(id: string, cantidad: string){
  const datos = {
     id : id,
     accion : "modificarCantidadTercerModulo",
     cantidad: cantidad
 }
 return this.http.post(this.url+'/tercerModulo', JSON.stringify(datos));
 }
 modificarCantidadTM(id: string){
  const datos = {
     id : id,
     accion : "modificarCantidad"
 }
 return this.http.post(this.url+'/tercerModulo', JSON.stringify(datos));
 }
 getProblemas(problema: string){
  return this.http.get(this.url+"/problemas?tabla="+problema)
}
insertarProblema(idPedido: string, idSegundoModulo: string, idUsuario: string){
  const datos={
    id: "",
    idUsuario: idUsuario,
    idPedido: idPedido,
    idprimerModulo: "",
    idSegundoModulo: idSegundoModulo,
    idtercerModulo: ""
  }
 
  return this.http.post(this.url+'/problemasProceso', JSON.stringify(datos));
}
insertarProblemaDesglose(idProblemaProce: string, idProblema: string, problema: string){
  if(!idProblema){
    idProblema = ""
  }
  if(!problema){
    problema = ""
  }
  console.log(problema)
  const datos={
    id: "",
    idProblemaProce: idProblemaProce,
    idProblema: idProblema,
    maquina : localStorage.getItem('idMaquina'),
    idLinea : localStorage.getItem('idlinea'),
    problema: problema
  }
  console.log(datos)
  return this.http.post(this.url+'/problemasDesglose', JSON.stringify(datos));
}
getProcesosPlanchado(id: string){
  return this.http.get(this.url+"/tercerModulo?id="+id)
}
insertTercerModulo(item, idsegundo: string){
  console.log(item)
  const datos={
    id: "",
    idsegundoModulo: idsegundo,
    idPedido: item.idPedido,
    idMaquinaProceso: item.idMaquinaProceso,
    idUsuario: localStorage.getItem('idusuario'),
    idPieza: item.idPieza,
    idColor: item.idColor,
    idTalla: item.idTalla,
    idPrimerModuloD: item.id,
    descripcio: "",
    CantidadRecibida: "0",
    cantidadInicio: "0",
    cantidadFinal: item.cantidad_pieza,
    cantidadefectuosas: "0",
    fechainicio: "",
    fechaFin: "",
    estado: "0",
    accion: "insert"
  }
  console.log(datos)
  return this.http.post(this.url+'/tercerModulo', JSON.stringify(datos))
 }
 modificarEstadoTM(datoss){
  const dat={
    estado: 2,
    id:"id",
    tabla: "maquinasProceso",
    idPrimerModulo: datoss
  }
  
  return this.http.post(this.url+'/primerModulo', JSON.stringify(dat));
}
getProcesosPlanchadoP(idMaquina: string){
  return this.http.get(this.url+"/tercerModulo?idMaquina="+idMaquina)
}
modificarEstadoS(datoss){
  console.log(datoss)
  const dat={
    estado: 2,
    id:"id",
    tabla: "segundoModulo",
    idPrimerModulo: datoss
  }
  return this.http.post(this.url+'/primerModulo', JSON.stringify(dat));
}
defectuosas(id: string){
  const datos={
    idUsuario: localStorage.getItem('idusuario'),
    idsegundoModulo: id,
    idtercerModulo: ""
  }
  return this.http.post(this.url+'/defectuosas', JSON.stringify(datos))
}
defectuosasTM(id: string){
  const datos={
    idUsuario: localStorage.getItem('idusuario'),
    idsegundoModulo: "",
    idtercerModulo: id
  }
  return this.http.post(this.url+'/defectuosas', JSON.stringify(datos))
}
cantDefecto(id: string, cantidad: string, descripcion: string){
  const datos={
    idDefectuosas: id,
    cantidad: cantidad,
    descripcion: descripcion
  }
  return this.http.post(this.url+'/cantidadDefectuosas', JSON.stringify(datos))
}
pausarProcesos(){
  let datos={
    accion: "pausa"
  }
  return this.http.post(this.url+'/pausa', JSON.stringify(datos))
}
reanudarProcesos(){
  let datos={
    accion: "inicia"
  }
  return this.http.post(this.url+'/pausa', JSON.stringify(datos))
}
getColorSM(id: string){
  return this.http.get(this.url+"/segundoModulo?idColor="+id)
}
 
}
