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
  listPalabraID:string[]=[];
  listPalabra:Palabra[]=[];
  id;
  items=[];
  showModal=false;
  col1New;
  col2New;
  constructor(
    private ARoute:ActivatedRoute,
    private router:Router,
    private gvSV:GrupoVocabularioService,
    private palabraSV:PalabraService
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('gvid').replace(/%20/g, " ");
    
    this.getlistPalabraID();
  }
  async getGV(){
    this.gv= await this.gvSV.getGrupoVocabulario(this.id);
  }

  getlistPalabraID(){
    this.palabraSV.getListPalabraIDbyGvId(this.id).subscribe((res:any)=>{
      this.getGV();
      this.listPalabraID=res;
    })
  }

  getlistPalabraEST(){
    this.palabraSV.getListPalabrabyGvId(this.id).subscribe((res:any)=>{
      this.listPalabra=res;
    })
  }

  

  sortOrder: 'asc' | 'desc' = 'asc'; // Orden inicial ascendente
  sortedColumn: string | null = null;

  sort(column: string): void {
    if (this.sortedColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Cambiar el orden si la misma columna se hace clic
    } else {
      this.sortedColumn = column; // Establecer la columna ordenada
      this.sortOrder = 'asc'; // Establecer el orden ascendente por defecto al cambiar de columna
    }

    // Ordenar la lista en función de la columna y el orden
    this.listPalabra.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }


  showContents(whatToShow:any){
    this.totalwords=0;
        this.totalwordsright=0;
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
      this.getlistPalabraEST()
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
  async startEjercicio(type:string){
    this.chosentype=type;
    this.listPalabraID=this.shuffle(this.listPalabraID);
    this.showTipoPractica=false;
    this.showEjercicio=true;
    this.totalwords=this.listPalabraID.length;
    const  word= await this.palabraSV.getPalabra(this.listPalabraID[0])
    if(type=='col1TOcol2'){
      this.title=this.gv.nombre_col1+' => '+this.gv.nombre_col2;
      this.wordShow=word.col1;
      this.wordtoguess=word.col2;
    }else if(type=='col2TOcol1'){
      this.title=this.gv.nombre_col2+' => '+this.gv.nombre_col1;
      this.wordShow=word.col2;
      this.wordtoguess=word.col1;
    }else if(type=='mixed'){
      this.title='Mezcla';
      const sample = arr => arr[Math.floor(Math.random() * arr.length)];
      if(sample){
        this.wordShow=word.col1;
      this.wordtoguess=word.col2;
      }
      else{
        this.wordShow=word.col2;
      this.wordtoguess=word.col1;
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
  async checkAnswer(){
    debugger;
    let wordtoguessNormalized=this.removeTextBetweenParentheses(this.removeTildes(this.wordtoguess).toLocaleLowerCase());
    let wordguessedNormalized=this.removeTildes(this.wordguessed).toLocaleLowerCase();
    if(wordtoguessNormalized==wordguessedNormalized){
      this.wordsdone=this.wordsdone+1;
      this.totalwordsright=this.totalwordsright+1;
      this.AnswToCheck=false;
      if(this.wordsdone==this.totalwords){
        this.wordsdone=0;
        this.wordShow="";
        this.wordtoguess="";
        this.wordguessed="";
            this.showEjercicio=false;
            this.finEjercicio=true;
      }else{
      let word= await this.palabraSV.getPalabra(this.listPalabraID[this.wordsdone])
      if(this.wordsdone<=this.totalwords){
        this.wordguessed="";
      if(this.chosentype=='col1TOcol2'){
        this.wordShow=word.col1;
        this.wordtoguess=word.col2;
      }else if(this.chosentype=='col2TOcol1'){
        this.wordShow=word.col2;
        this.wordtoguess=word.col1;
      }else if(this.chosentype=='mixed'){
        const sample = arr => arr[Math.floor(Math.random() * arr.length)];
        if(sample){
          this.wordShow=word.col1;
        this.wordtoguess=word.col2;
        }
        else{
          debugger;
          if(this.totalwords==this.wordsdone-1)
          this.wordsdone=this.wordsdone+1;
          this.wordShow=word.col2;
        this.wordtoguess=word.col1;
        }
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
  async nextWord(){
    this.wordFailed=false;
    this.tries=0;
    this.AnswToCheck=true;
    if(this.wordsdone==this.totalwords){
  this.wordsdone=0;
  this.wordShow="";
  this.wordtoguess="";
  this.wordguessed="";
      this.showEjercicio=false;
      this.finEjercicio=true;
    }else{
      let word= await this.palabraSV.getPalabra(this.listPalabraID[this.wordsdone])
    if(this.chosentype=='col1TOcol2'){
      this.wordShow=word.col1;
      this.wordtoguess=word.col2;
    }else if(this.chosentype=='col2TOcol1'){
      this.wordShow=word.col2;
      this.wordtoguess=word.col1;
    }else if(this.chosentype=='mixed'){
      const sample = arr => arr[Math.floor(Math.random() * arr.length)];
      if(sample){
        this.wordShow=word.col1;
      this.wordtoguess=word.col2;
      }
      else{
        this.wordShow=word.col2;
      this.wordtoguess=word.col1;
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

  create() {

    this.palabraSV.createPalabra(this.id,this.col1New,this.col2New);
 this.col1New="";
 this.col2New="";
  this.showModal=false;
}

}
