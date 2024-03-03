import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  edit=true;
  user=new User();
  constructor(
    private userSV:UserService,
    private router: Router) { }

  ngOnInit() {
    this.getUser();
  }
  async getUser(){
        this.getUserData(localStorage.getItem("logUserID"));
  }
  async getUserData(id){
    this.user= await this.userSV.getUser(id);
  }
  editUser(){
    this.userSV.changePass(this.user.password);
    this.userSV.editUser(this.user.id,this.user.password,this.user.email); 
    this.edit=true
  }
  bloqUser(){
    this.userSV.bloquearUser(this.user.id,1);
    localStorage.clear();
    this.userSV.SignOut();
    this.router.navigate(['/']);
  }
  allowEdit(){
    debugger;
    this.edit=false;
  }

}
