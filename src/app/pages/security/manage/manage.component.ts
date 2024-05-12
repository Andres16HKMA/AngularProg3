import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Security } from 'src/app/models/security.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  security: Security;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SecurityService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.security = { _id: '', email: '', password: '', name: '', token: 0};
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    if (currentUrl.includes('login')) {
      this.mode = 1;
      this.theFormGroup.get('token')?.disable();
      this.theFormGroup.get('password')?.enable();
    } else if (currentUrl.includes('secondFactor')) {
      this.mode = 2;
      this.theFormGroup.get('token')?.enable();

      this.theFormGroup.get('password')?.disable();
    }
}


  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  secondFactor() {
    this.trySend = true;
    
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor, llene correctamente los campos", "error");
    } else {
      this.service.secondFactor(this.security).subscribe({
        next: (data) => {
          if (data == null) {
            Swal.fire("Error", "Por favor, digite bien el token", "error");
          } else {
            // Asegúrate de que estás navegando hacia la ruta correcta
            this.router.navigate([`security/login`]);
            
            Swal.fire('Completado', 'Se ha creado Correctamente', 'success');
          }
        },
        error: () => {
          Swal.fire("Error", "token no coincide", "error");
        }
      });
    }
}


  login() {
    this.trySend = true;
    
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor, llene correctamente los campos", "error");
    } else {
      this.service.login(this.security).subscribe({
        next: (data) => {
          if (data == null) {
            Swal.fire("Error", "Por favor, llene los campos bien", "error");
          } else {
            this.security._id = data._id;
            this.security.email = data.email;
            this.security.name = data.name;
            this.security.password = data.password;
            this.security.token=data.token
            localStorage.setItem("Prueba1", JSON.stringify(data));
            // Asegúrate de que estás navegando hacia la ruta correcta
            this.router.navigate([`security/secondFactor/${this.security._id}`]);
            
            Swal.fire('Completado', 'Se ha creado Correctamente', 'success');
          }
        },
        error: () => {
          Swal.fire("Error", "Contraseña o correo no coinciden", "error");
        }
      });
    }
}
}
