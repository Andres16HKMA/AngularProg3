import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode : number; // 1->View, 2-> Create, 3->Update
  theater:Theater;
  theFormGroup:FormGroup;
  trySend:boolean;
  constructor(private activateRoute:ActivatedRoute, 
              private service:TheaterService, 
              private router:Router,
              private theFormBuilder:FormBuilder) {
    this.trySend=false;
    this.mode=1;
    this.theater={id:0, location:' ',capacity:0};
   }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')){
      this.mode=1;
    }else if (currentUrl.includes('create')){
      this.mode=2;
    }else if (currentUrl.includes('update')){
      this.mode=3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.theater.id=this.activateRoute.snapshot.params.id
      this.getTheater(this.theater.id)
    }
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity:[1,[Validators.required,Validators.min(1),Validators.max(100)]],
      location:['',[Validators.required,Validators.minLength(2), Validators.maxLength(20)]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.theater=data
    })
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire("Error","Por favor llene correctamente los campos","error")
    }else{
      this.service.create(this.theater).subscribe(data=>{
        Swal.fire(
          'Completado','Se ha creado Correctamente', 'success'
        )
        this.router.navigate(['theaters/list'])
      })
  }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire("Error","Por favor llene correctamente los campos","error")
    }else{
      this.service.update(this.theater).subscribe(data=>{
        Swal.fire(
          'Completado','Se ha actualizado Correctamente', 'success'
        )
        this.router.navigate(['theaters/list'])
      })
    }
  }


}
