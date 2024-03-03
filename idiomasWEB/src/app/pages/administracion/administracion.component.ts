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
  userNoAdminsFiltered=[];
  adminElegido;
  //takeout admin
  userAdmins=[];
  userAdminsFiltered=[];
  userAdminElegido;
  //bloqUser
  userNoBloq=[];
  userNoBloqFiltered=[];
  userNoBloqElegido;
  //desbloqUser
  userBloq=[];
  userBloqFiltered=[];
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

  onKeyNoBloq(value) { 
    this.userBloqFiltered = this.searchNoBloq(value);
    }

    searchNoBloq(value: string) { 
      let filter = value.toLowerCase();
      return this.userBloq.filter(option => option.email.toLowerCase().startsWith(filter));
    }

    onKeyBloq(value) { 
      this.userNoBloqFiltered = this.searchBloq(value);
      }
  
      searchBloq(value: string) { 
        let filter = value.toLowerCase();
        return this.userNoBloq.filter(option => option.email.toLowerCase().startsWith(filter));
      }

      onKeyAdmin(value) { 
        this.userNoAdminsFiltered = this.searchAdmin(value);
        }
    
        searchAdmin(value: string) { 
          let filter = value.toLowerCase();
          return this.userNoAdmins.filter(option => option.email.toLowerCase().startsWith(filter));
        }

        onKeyNoAdmin(value) { 
          this.userAdminsFiltered = this.searchNoAdmin(value);
          }
      
          searchNoAdmin(value: string) { 
            let filter = value.toLowerCase();
            return this.userAdmins.filter(option => option.email.toLowerCase().startsWith(filter));
          }

  async getUserBloq(){
    await this.userSV.getListUsersBloq().subscribe((res)=>{
      this.userBloq=res;
      this.userBloqFiltered=res;
    })
  }

  async getUserNoBLoq(){
    await this.userSV.getListUsersNoBloq().subscribe((res)=>{
      this.userNoBloq=res;
      this.userNoBloqFiltered=res;
    })
  }


  
  async getUserAdmin(){
    await this.userSV.getListUsersAdmin().subscribe((res)=>{
      this.userAdmins=res;
      this.userAdminsFiltered=res;
    })
  }

  async getUserNoAdmin(){
    await this.userSV.getListUsersNoAdmin().subscribe((res)=>{
      this.userNoAdmins=res;
      this.userNoAdminsFiltered=res;
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
