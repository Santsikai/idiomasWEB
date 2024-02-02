import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users/user-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  constructor(
    private userSV: UserService, 
    private router: Router,
    ){}
  email:string;
  password:string;
  passwordc:string;
  username:string;
  iduserbloq;
  iduserrol;
  showAlertbbu=false;
  showAlertbba=false;
  showAlertbbanoigualpass=false;
  ngOnInit() {
    this.getuserLogged();
  }
  async getuserLogged(){
    let a=await this.userSV.getLoggedUser();
    if(a){
      localStorage.setItem("logUserID",JSON.stringify(a.uid));
      localStorage.setItem("isLoginRegister","true");
          this.router.navigate(['/idiomas']);
    }
  }
  async login(){
    this.userSV.login(this.username,this.password)      
    .then(async (res:any) => {
    await this.userSV.getUserByUsernameandPass(this.username,this.password).subscribe((r:any)=>{
      if(r[0].bloqued==0){
          localStorage.setItem("logUserID",JSON.stringify(res.user.uid));
          localStorage.setItem("isLoginRegister","true");
          localStorage.setItem("rol_Id",r[0].role_id);
          this.router.navigate(['/idiomas']);
    }
    else if( r[0].bloqued==1){
      //show alert de la cuenta ha sido bloqueada por el usuario
      this.iduserbloq=r[0].id;
      this.iduserrol=r[0].role_id;
      this.showAlertbbu = true;
    }
    else if(r[0].bloqued==2){
      this.userSV.SignOut();
      //show alert de la cuenta ha sido bloqueada por los administradores
      this.showAlertbba = true;//this.presentAlertTotalBlok();
    }
  
})
}).catch((error:any) => {
    
  window.alert('Fallo al introducir los datos')
})
  }
  desblock(){
    this.userSV.bloquearUser(this.iduserbloq,0);
          localStorage.setItem("logUserID",JSON.stringify(this.iduserbloq));
          localStorage.setItem("isLoginRegister","true");
          localStorage.setItem("rol_Id",this.iduserrol);
          this.router.navigate(['/idiomas']);
  }


  register(){
    if(this.password==this.passwordc){
      this.userSV.createUser(this.username,this.password,this.email,"2")      
      .then((res) => {
        localStorage.setItem("logUserID",JSON.stringify(res.id));
        localStorage.setItem("isLoginRegister","true");
        localStorage.setItem("rol_Id","2");
        this.router.navigate(['/menu']);
      }).catch((error) => {
        window.alert(error.message)
      })
    }else{
        window.alert("las constraseñas no coinciden")
      }
  }
}
