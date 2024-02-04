import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from 'src/app/services/grupoVocabulario/grupo-vocabulario.service';
import { Palabra, PalabraService } from 'src/app/services/palabra/palabra.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent {
  showOpciones=true;
  showEstudiar=false;
  showPracticar=false;
  showEjercicio=false;
  showTipoPractica=false;
  finEjercicio=false;
  gv:GrupoVocabulario;
  listPalabra:Palabra[]=[];
  id;
  items=[];
  allpalabras=false;
  constructor(
    private ARoute:ActivatedRoute,
    private router:Router,
    private gvSV:GrupoVocabularioService,
    private palabraSV:PalabraService
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('gvid').replace(/%20/g, " ");
    if(this.router.url.includes('/pages/practicaIdioma')){
      this.allpalabras=true;
      this.getlistAllPalabra();
    }else{
    this.allpalabras=false;
    
    this.getlistPalabra();
    }
  }
  async getGV(){
    this.gv= await this.gvSV.getGrupoVocabulario(this.id);
  }
  getlistAllPalabra(){
    this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe((r:any)=>{
      for(let e of r){
        this.palabraSV.getListPalabrabyGvId(e.id).subscribe((res:any)=>{
          for(let p of res){
            this.listPalabra.push(p)
          }
    })
      }
      
    })
    
  }
  getlistPalabra(){
    this.palabraSV.getListPalabrabyGvId(this.id).subscribe((res:any)=>{
      this.getGV();
      this.listPalabra=res;
    })
  }


  showContents(whatToShow:any){
    if(whatToShow=='practicar'){
      this.showPracticar=true;
      this.showOpciones=false;
      this.showTipoPractica=true;
      this.showEjercicio=false;
      this.finEjercicio=false;
    }else if(whatToShow=='estudiar'){
      this.showEstudiar=true;
      this.showOpciones=false;
      this.showEjercicio=false;
      this.finEjercicio=false;
      this.showPracticar=false;
    }else if(whatToShow=='reintentar'){
      this.showEstudiar=false;
      this.showOpciones=false;
      this.showEjercicio=false;
      this.showTipoPractica=true;
      this.finEjercicio=false;
      this.showPracticar=true;
    }else if(whatToShow=='opciones'){
      this.showPracticar=false;
      this.showOpciones=true;
      this.showTipoPractica=false;
      this.showEstudiar=false;
    }
  }

  totalwords:number=0;
  totalwordsright:number=0;
  wordsdone:number=0;
  wordShow:string="";
  wordtoguess:string="";
  wordguessed:string="";
  chosentype:string="";
  title="";
  startEjercicio(type:string){
    this.chosentype=type;
    this.listPalabra=this.shuffle(this.listPalabra);
    this.showTipoPractica=false;
    this.showEjercicio=true;
    this.totalwords=this.listPalabra.length;
    if(type=='col1TOcol2'){
      this.title=this.gv.nombre_col1+' => '+this.gv.nombre_col2;
      this.wordShow=this.listPalabra[0].col1;
      this.wordtoguess=this.listPalabra[0].col2;
    }else if(type=='col2TOcol1'){
      this.title=this.gv.nombre_col2+' => '+this.gv.nombre_col1;
      this.wordShow=this.listPalabra[0].col2;
      this.wordtoguess=this.listPalabra[0].col1;
    }else if(type=='mixed'){
      this.title='Mezcla';
      const sample = arr => arr[Math.floor(Math.random() * arr.length)];
      if(sample){
        this.wordShow=this.listPalabra[0].col1;
      this.wordtoguess=this.listPalabra[0].col2;
      }
      else{
        this.wordShow=this.listPalabra[0].col2;
      this.wordtoguess=this.listPalabra[0].col1;
      }
    }
  }
  tries=0;
  wordFailed=false;
  removeTildes(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^nN](?=\w)/g, (match) => {
        // Reemplazar las letras acentuadas por sus equivalentes sin acento
        const equivalent = {
          á: 'a',
          é: 'e',
          í: 'i',
          ó: 'o',
          ú: 'u',
        };
        return equivalent[match] || match;
      });
  }
  removeTextBetweenParentheses(text: string): string {
    return text.replace(/\([^)]*\)/g, ''); // Expresión regular para eliminar el contenido entre paréntesis
  }
  AnswToCheck=true;
  checkAnswer(){
    debugger;
    let wordtoguessNormalized=this.removeTextBetweenParentheses(this.removeTildes(this.wordtoguess).toLocaleLowerCase());
    let wordguessedNormalized=this.removeTildes(this.wordguessed).toLocaleLowerCase();
    if(wordtoguessNormalized==wordguessedNormalized){
      this.wordsdone=this.wordsdone+1;
      this.totalwordsright=this.totalwordsright+1;
      this.AnswToCheck=false;
      if(this.wordsdone<=this.totalwords){
        this.wordguessed="";
      if(this.chosentype=='col1TOcol2'){
        this.wordShow=this.listPalabra[this.wordsdone].col1;
        this.wordtoguess=this.listPalabra[this.wordsdone].col2;
      }else if(this.chosentype=='col2TOcol1'){
        this.wordShow=this.listPalabra[this.wordsdone].col2;
        this.wordtoguess=this.listPalabra[this.wordsdone].col1;
      }else if(this.chosentype=='mixed'){
        const sample = arr => arr[Math.floor(Math.random() * arr.length)];
        if(sample){
          this.wordShow=this.listPalabra[this.wordsdone].col1;
        this.wordtoguess=this.listPalabra[this.wordsdone].col2;
        }
        else{
          debugger;
          if(this.totalwords==this.wordsdone-1)
          this.wordsdone=this.wordsdone+1;
          this.wordShow=this.listPalabra[this.wordsdone].col2;
        this.wordtoguess=this.listPalabra[this.wordsdone].col1;
        }
      }
    }
    }else{
      this.tries=this.tries+1;
      if(this.tries==3){
        this.wordFailed=true;
        this.wordguessed="";
        this.wordsdone=this.wordsdone+1;
      }
    }
  }
  nextWord(){
    this.wordFailed=false;
    this.tries=0;
    this.AnswToCheck=true;
    if(this.wordsdone==this.totalwords){
      this.totalwords=0;
  this.totalwordsright=0;
  this.wordsdone=0;
  this.wordShow="";
  this.wordtoguess="";
  this.wordguessed="";
      this.showEjercicio=false;
      this.finEjercicio=true;
    }else{
    if(this.chosentype=='col1TOcol2'){
      this.wordShow=this.listPalabra[this.wordsdone].col1;
      this.wordtoguess=this.listPalabra[this.wordsdone].col2;
    }else if(this.chosentype=='col2TOcol1'){
      this.wordShow=this.listPalabra[this.wordsdone].col2;
      this.wordtoguess=this.listPalabra[this.wordsdone].col1;
    }else if(this.chosentype=='mixed'){
      const sample = arr => arr[Math.floor(Math.random() * arr.length)];
      if(sample){
        this.wordShow=this.listPalabra[this.wordsdone].col1;
      this.wordtoguess=this.listPalabra[this.wordsdone].col2;
      }
      else{
        this.wordShow=this.listPalabra[this.wordsdone].col2;
      this.wordtoguess=this.listPalabra[this.wordsdone].col1;
      }
    }
  }
  }

   shuffle(array: any[]){ 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };
}
