import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from 'src/app/services/grupoVocabulario/grupo-vocabulario.service';
import { Idioma, IdiomaService } from 'src/app/services/idioma/idioma.service';

@Component({
  selector: 'app-lenguaje',
  templateUrl: './lenguaje.component.html',
  styleUrls: ['./lenguaje.component.scss']
})
export class LenguajeComponent implements OnInit{
  idioma:Idioma;
  listgv:GrupoVocabulario[]=[];
  id:any;
  showModal=false;
  nameNew;
  col1New;
  col2New;
  constructor(
    private ARoute:ActivatedRoute,
    private idiomaSV:IdiomaService,
    private gvSV:GrupoVocabularioService,
    private router:Router
  ) { }
  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('lengid').replace(/%20/g, " ");
    this.getListaGV();
    
  }
  async getIdioma(){
    this.idioma= await this.idiomaSV.getIdioma(this.id);
  }
  getListaGV(){
    this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe((res:any)=>{
      debugger;
      this.getIdioma();
      this.listgv=res;
    })
  }

  create() {

    this.gvSV.createGrupoVocabulario(this.id,this.nameNew,this.col1New,this.col2New);
    this.nameNew="";
 this.col1New="";
 this.col2New="";
  this.showModal=false;
}


}
