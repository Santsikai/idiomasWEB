import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Idioma, IdiomaService } from 'src/app/services/idioma/idioma.service';

@Component({
  selector: 'app-lista-lenguajes',
  templateUrl: './lista-lenguajes.component.html',
  styleUrls: ['./lista-lenguajes.component.scss']
})
export class ListaLenguajesComponent {
  userId;
  listIdiomas:Idioma[]=[];
  nombreLeng;
  showModal=false;
  constructor(
    private idiomaSV:IdiomaService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.getUserID();
    
  }
  moveTo(id){
    this.router.navigate(['/pages/idioma',id]);
  }
  public async getUserID(){
      this.userId=localStorage.getItem("logUserID");
      this.idiomaSV.getListIdiomabyUserId(this.userId ).subscribe((res)=>{
        debugger;
        this.listIdiomas= res;
      });
  }
  create() {

    this.idiomaSV.createIdioma(this.userId,this.nombreLeng);
    this.nombreLeng="";
    this.showModal=false
}


}
