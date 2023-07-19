import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class ArchivosService{


    constructor() {}



//en archivos y perfil los tipos son en singular, pero en buscar y usuarios es en plural
    async actualizacionFoto( 
        archivo: File,
        tipo: 'usuario' | 'inventario' | 'evento' | 'articulo',
        id: string
        ) {

        try {

            const url = `${base_url}/archivos/${ tipo }/${ id }`;
            const formData = new FormData();
            formData.append('imagen', archivo);

            const resp = await fetch( url, { 
                method: 'PUT',
                headers:{
                    'xtoken': localStorage.getItem('token') || ''
                },
                body: formData
             });
             
           
             const data = await resp.json();
          

             if ( data.ok ) {
                return data.nombreArchivo;  
              } else {
                console.log(data.msg);
                return false;
              }

        } catch (error) {
            console.log(error);
            return false;
        }

    }

}