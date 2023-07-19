import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo';
import { ArticulosService } from 'src/app/services/articulos.service';
import { BuscarService } from 'src/app/services/buscar.service';
// import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
})
export class ArticulosComponent implements OnInit{

  public articulos:  Articulo[] = [];
  // public articulosTemp:  Articulo[] = [];
  public cargar: boolean = true;
 

  
  constructor(private articulosService: ArticulosService, private buscarService: BuscarService ){}
  // private modalImagenService: ModalImagenService
  ngOnInit(): void {
    this.cargarArticulo();

}

abrirModal(){
  this.articulosService.abrirModal();
}


cargarArticulo(){
  this.cargar = true;

   this.articulosService.cargarArticulo()
                      .subscribe( articulos  => {
                        this.cargar = false;
                        this.articulos = articulos;
                      })
  }

  //en archivos y perfil los tipos son en singular, pero en buscar y usuarios es en plural
buscarArticulo( termino: string) {

  if(termino.length === 0){
    return this.cargarArticulo();
  }

  this.buscarService.buscarArticulo( 'articulos', termino )
          .subscribe((resp: Articulo[]) => {
           this.articulos = resp;
});

}


  guardarCambios( articulo: Articulo ){
    this.articulosService.actualizarArticulo(articulo._id, articulo.producto, articulo.cantidad)
                                .subscribe(resp => {
                                Swal.fire('Actualización exitosa de',articulo.producto , 'success' );
                                });
  }

  eliminarArticulo( articulo: Articulo ){
    Swal.fire({
      title: '¿Seguro que desea eliminar el artículo?',
      text: `Se borrará el artículo ${ articulo.producto }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
  
    }).then((result) => {
      if (result.value) {
        this.articulosService.eliminarArticulo(articulo._id)
       .subscribe( resp =>{
        this.cargarArticulo();
        Swal.fire('Fila eliminada', `${articulo.producto} ha sido eliminado correctamente`, 'success');
       });
      }
    });
  }

  
    
//   abrirModal(articulo: Articulo ){
//     this.modalImagenService.abrirModal('articulos', articulo._id, articulo.img );
// }
   

}
