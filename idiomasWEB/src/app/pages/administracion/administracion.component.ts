import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {
  //new admin
  newEmail;
  newPass;
  //make admin
  userNoAdmins=[];
  adminElegido;
  //takeout admin
  userAdmins=[];
  userAdminElegido;
  //bloqUser
  userNoBloq=[];
  userNoBloqElegido;
  //desbloqUser
  userBloq=[];
  userBloqElegido;
  constructor(
    private userSV:UserService
  ){}
  ngOnInit() {
    this.getUserBloq();
    this.getUserAdmin();
    this.getUserNoAdmin();
    this.getUserNoBLoq();
  }

  async getUserBloq(){
    await this.userSV.getListUsersBloq().subscribe((res)=>{
      this.userBloq=res;
    })
  }

  async getUserNoBLoq(){
    await this.userSV.getListUsersNoBloq().subscribe((res)=>{
      this.userNoBloq=res;
    })
  }

  async getUserAdmin(){
    await this.userSV.getListUsersAdmin().subscribe((res)=>{
      this.userAdmins=res;
    })
  }

  async getUserNoAdmin(){
    await this.userSV.getListUsersNoAdmin().subscribe((res)=>{
      this.userNoAdmins=res;
    })
  }

  async newAdmin(){
    await this.userSV.createUser(this.newPass,this.newEmail,"1");
  }

  changeToAdmin(event){
    this.userSV.AdminUser(event.value.id,"1");
    this.adminElegido="";
  }

  changeToUser(event){
    this.userSV.AdminUser(event.value.id,"2");
    this.userAdminElegido="";
  }
  desbloquear(event){
    this.userSV.bloquearUser(event.value.id,0);
    this.userBloqElegido="";
  }
  bloquear(event){
    this.userSV.bloquearUser(event.value.id,1);
    this.userNoBloqElegido="";
  }

}
