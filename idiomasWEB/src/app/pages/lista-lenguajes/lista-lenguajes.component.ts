import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Idioma, IdiomaService, lang } from 'src/app/services/idioma/idioma.service';

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
  selectedLanguage;
  privacidad:boolean=false;
  lang=lang;
  constructor(
    private idiomaSV:IdiomaService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.getUserID();
    
  }
  moveToLeng(idioma:Idioma){
    localStorage.setItem('langUserID',idioma.user_id)
    localStorage.setItem('langprivacity',String(idioma.private))
    this.router.navigate(['/idiomas/lenguaje',idioma.id]);
  }
  public async getUserID(){
      this.userId=localStorage.getItem("logUserID");
      this.idiomaSV.getListIdiomabyUserId(this.userId ).subscribe((res)=>{
        this.listIdiomas= res;
        this.idiomaSV.getListIdiomabyIdiomaUserId(this.userId).subscribe((r:any)=>{
          this.listIdiomas.push(...r)
        })
      });
      
  }
  create() {

    this.idiomaSV.createIdioma(this.userId,this.nombreLeng,this.selectedLanguage,this.privacidad);
    this.nombreLeng="";
    this.showModal=false
}




}
