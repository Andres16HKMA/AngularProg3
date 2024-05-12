import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Security } from 'src/app/models/security.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  security:Security[]
  constructor(private service:SecurityService, private router:Router) {
    this.security=[]
   }

  ngOnInit(): void {
  }


  login(){
    this.router.navigate(['security/login/'])
  }

  secondFactor(id:number){
    this.router.navigate(['security/secondFactor'+id])
  }


}
