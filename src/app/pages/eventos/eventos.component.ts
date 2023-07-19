import { Component, OnDestroy, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo';
import { Evento } from 'src/app/models/evento';
import { ArticulosService } from 'src/app/services/articulos.service';
import { BuscarService } from 'src/app/services/buscar.service';
import { EventosService } from 'src/app/services/eventos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit{

        public cargar: boolean = true;
        public eventos: Evento[] = [];
       

    constructor ( private eventosService: EventosService, private buscarService: BuscarService){}
  
  

 
 
    ngOnInit(): void {
        this.cargarEvento();
       
  }

    cargarEvento(){
      this.cargar = true
      this.eventosService.cargarEvento()
      .subscribe( eventos => {
        this.cargar = false;
        this.eventos = eventos;

      });
    }

    abrirModal(){
      this.eventosService.abrirModal();
    }
    

      //en archivos y perfil los tipos son en singular, pero en buscar y usuarios es en plural
buscarEvento( termino: string) {

  if(termino.length === 0){
    return this.cargarEvento();
  }

  this.buscarService.buscarEvento( 'eventos', termino )
          .subscribe(resp => {
           this.eventos = resp;
});
}

// guardarCambios( eventos: Evento ){
//   this.eventosService.actualizarEvento(eventos)
//                               .subscribe(resp => {
//                                 Swal.fire('Actualización exitosa de', eventos.nombre , 'success' );
//                               });
// }

guardarCambios( eventos: Evento ){
  this.eventosService.actualizarEvento(eventos)
                              .subscribe(resp => {
                                Swal.fire('Actualización exitosa de', eventos.nombre , 'success' );
                              });
}



eliminarEvento( eventos: Evento ){
  Swal.fire({
      title: '¿Seguro que desea eliminar la fila?',
      text: `Se borrará el evento ${ eventos.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
  
    }).then((result) => {
      if (result.value) {
        this.eventosService.eliminarEvento(eventos._id)
       .subscribe( resp =>{
        this.cargarEvento();
        Swal.fire('Fila eliminada', `${eventos.nombre} ha sido eliminado correctamente`, 'success');
       });
      }
    });
}

}
