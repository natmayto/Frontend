import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Articulo } from 'src/app/models/articulo';
import { Evento } from 'src/app/models/evento';
import { ArticulosService } from 'src/app/services/articulos.service';
import { EventosService } from 'src/app/services/eventos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styles: [
  ]
})
export class EventoComponent implements OnInit{

  public eventoForm: FormGroup<any>;
  public articulos: Articulo[] = [];
  public articuloSeleccionado: Articulo;
  public eventoSeleccionado: Evento;


  constructor(private fb: FormBuilder, private articuloService: ArticulosService,
     private eventoService: EventosService, private router: Router, 
     private activatedRoute: ActivatedRoute){

     }


  ngOnInit(): void {

      this.activatedRoute.params.subscribe( ({ id }) =>
        this.cargarEvento(id)  );
 
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required ],
      articulo: ['', Validators.required ],
      // descripcion: [''],
    });
    this.cargarArticulo();

    this.eventoForm.get('articulo').valueChanges
    .subscribe( articuloId =>{ 
      this.articuloSeleccionado = this.articulos.find( a => a._id === articuloId )
    })
  }
  



  cargarEvento( id: string ) {
    
    if (id==='nuevo'){
        return;
    }
      
    this.eventoService.obtenerEventoPorId(id)
    .pipe(
      delay(300)
    )
    .subscribe( evento => {
         if ( !evento ) {
        return this.router.navigateByUrl(`/dashboard/eventos`);
      }
      const { nombre, articulo:{ _id } } = evento; 
      console.log(nombre, _id);
      this.eventoSeleccionado = evento;
      this.eventoForm.setValue({ nombre, articulo: _id });
    })
  }



  cargarArticulo(){
    this.articuloService.cargarArticulo()
    .subscribe( (articulos: Articulo[]) => {
      this.articulos = articulos;
    })
  }

  guardarEvento(){
     this.eventoForm.value;

     if ( this.eventoSeleccionado ) {
      // actualizar
      const dato = {
        ...this.eventoForm.value,
        _id: this.eventoSeleccionado._id
      }
      this.eventoService.actualizarEvento( dato )
        .subscribe( resp => {
          Swal.fire('Actualizado', ' Evento actualizado correctamente', 'success');
        })

    } else {
      this.eventoService.crearEvento ( this.eventoForm.value )
      .subscribe ( (resp: any) => {
        console.log(resp);
        Swal.fire('Registro guardado', 'Registro guardado correctamente', 'success');
        this.router.navigateByUrl(`dashboard/evento/${resp.evento._id}`)
      })
    }
  }

 


}
