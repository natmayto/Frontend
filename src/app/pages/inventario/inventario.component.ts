import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario';
import { BuscarService } from 'src/app/services/buscar.service';
import { InventarioService } from 'src/app/services/inventario.service';
// import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-formulario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css',
  ]
})
export class InventarioComponent implements OnInit {

  public inventarios: Inventario[] = [];
  public cargar: boolean = true;

  constructor(private inventarioService: InventarioService, private buscarService: BuscarService){}

  // private modalImagenService: ModalImagenService

  ngOnInit(): void {
    this.cargarInventario();
  }

  abrirModal(){
    this.inventarioService.abrirModal();
  }

  cargarInventario(){
    this.cargar = true;
     this.inventarioService.cargarInventario()
                        .subscribe( inventarios  => {
                          this.cargar = false;
                          this.inventarios = inventarios;
                        })
    }

    buscarInventario( termino: string ){
      if(termino.length === 0){
        return this.cargarInventario();
      } 
      this.buscarService.buscarInventario( 'inventarios', termino )
              .subscribe(resp => {
               this.inventarios = resp;
    });
    }

    guardarCambios( inventario: Inventario ){
      this.inventarioService.actualizarInventario(inventario._id, inventario.nombre, inventario.cantidad,  inventario.descripcion)
                                  .subscribe(resp => {
                                    Swal.fire('Actualización exitosa de', inventario.nombre, 'success' );
                                  });
    }

    eliminarInventario( inventario: Inventario ){
      Swal.fire({
          title: '¿Seguro que desea eliminar la fila?',
          text: `Se borrará la fila de ${ inventario.nombre }`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Eliminar'
      
        }).then((result) => {
          if (result.value) {
            this.inventarioService.eliminarInventario(inventario._id)
           .subscribe( resp =>{
            this.cargarInventario();
            Swal.fire('Fila eliminada', `${inventario.nombre} ha sido eliminado correctamente`, 'success');
           });
          }
        });
}

  // abrirModal(inventario: Inventario ){
  //     this.modalImagenService.abrirModal('inventarios', inventario._id, inventario.img );
  // }
}
