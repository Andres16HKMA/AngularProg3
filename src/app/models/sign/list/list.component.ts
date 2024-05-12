import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sign } from 'src/app/models/sign.model';
import { SignService } from 'src/app/services/sign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  Sign:Sign[]
  constructor(private service:SignService, private router:Router) {
    this.Sign=[]
   }

  ngOnInit(): void {
    this.list()
  }
  list(){
    this.service.list().subscribe(data=>{
      this.Sign=data;
      console.log(JSON.stringify(this.Sign))
    })
  }

  create(){
    this.router.navigate(['sign/create/'])
  }

  view(id:number){
    this.router.navigate(['sign/view/'+id])
  }

  update(id:number){
    this.router.navigate(['sign/update/'+id])
  }

  delete(id: number){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: "Está seguro que quiere eliminar el Usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'El Usuario ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };


}
