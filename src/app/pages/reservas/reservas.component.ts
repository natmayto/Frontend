import { Component } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { BuscarService } from 'src/app/services/buscar.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { registerReserva } from 'src/app/interfaces/registerReserva.interface';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {

  public reservas:  Reserva[] = [];
  public cargar: boolean = true;
  public register: registerReserva[] = [];
  date = (moment("2021-07-14T00:00:00.000Z").utc().format('yyyy/MM/dd HH:mm zzz'))

  constructor(private reservasService: ReservasService, private buscarService: BuscarService ){}
  // private modalImagenService: ModalImagenService
  ngOnInit(): void {
    this.cargarReserva();

}

abrirModal(){
  this.reservasService.abrirModal();
}

// 'yyyy/MM/dd HH:mm zzz'
cargarReserva(){
  this.cargar = true;

   this.reservasService.cargarReserva()
                      .subscribe( reservas  => {
                        this.cargar = false;
                        this.reservas = reservas;
                      })
  }

  //en archivos y perfil los tipos son en singular, pero en buscar y usuarios es en plural
buscarReserva( termino: string) {

  if(termino.length === 0){
    return this.cargarReserva();
  }

  this.buscarService.buscarReserva( 'reservas', termino )
          .subscribe(resp => {
           this.reservas = resp;
});
}

guardarCambios( reserva: Reserva ){
  this.reservasService.actualizarReserva(reserva._id, reserva.nombre, reserva.fecha,  reserva.descripcion)
                              .subscribe(resp => {
                                Swal.fire('Actualización exitosa de', reserva.nombre , 'success' );
                              });
}

eliminarReserva( reserva: Reserva){
  Swal.fire({
      title: '¿Seguro que desea eliminar la fila?',
      text: `Se borrará la reserva de ${ reserva.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
  
    }).then((result) => {
      if (result.value) {
        this.reservasService.eliminarReserva(reserva._id)
       .subscribe( resp =>{
        this.cargarReserva();
        Swal.fire('Fila eliminada', `${reserva.nombre} ha sido eliminado correctamente`, 'success');
       });
      }
    });
}


}