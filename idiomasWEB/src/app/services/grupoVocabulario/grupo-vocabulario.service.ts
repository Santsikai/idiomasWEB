import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { PalabraService } from '../palabra/palabra.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoVocabularioService {

  constructor(
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private dbf:AngularFirestore,
    private palabraSV:PalabraService,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  SetGrupoVocabularioData(apartado) {
    const GrupoVocabularioRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `grupoVocabulario/${apartado.id}`
    );
    
    const GrupoVocabularioData: GrupoVocabulario = {
      id: apartado.id,
      idioma_id: apartado.idioma_id,
      nombre: apartado.nombre,
      nombre_col1:apartado.nombre_col1,
      nombre_col2:apartado.nombre_col2,
    };
    return GrupoVocabularioRef.set(GrupoVocabularioData, {
      merge: true,
    });
  }

  public async getGrupoVocabulario(id:string){
    let a=new GrupoVocabulario();
     let af= this.dbf.doc<GrupoVocabulario>(`grupoVocabulario/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data().id;
      a.nombre=arg.payload.data().nombre;
      a.idioma_id=arg.payload.data().idioma_id;
      a.nombre_col1=arg.payload.data().nombre_col1;
      a.nombre_col2=arg.payload.data().nombre_col2;
    });
    return a;
  }

  public getListGrupoVocabulariobyIdiomaId(id:string){
   let b = this.dbf.collection<GrupoVocabulario>('/grupoVocabulario',ref => ref.where("idioma_id","==",id));
    return b.valueChanges();
  }

  public editGrupoVocabulario(id:string, newname:string,nombre_col1:string,nombre_col2:string){
    this.dbf.doc(`grupoVocabulario/${id}`).set({
      nombre:newname,
      nombre_col1:nombre_col1,
      nombre_col2:nombre_col2
    },{merge:true});
    
  }

  public async deleteGrupoVocabulariobyIdiomaId(id:string){
    this.getListGrupoVocabulariobyIdiomaId(id).subscribe((res:any)=>{
      res.forEach(e => {
        this.deleteGrupoVocabulario(e.id);
      });
      
    })
    
  }

  public async deleteGrupoVocabulario(id:string){
     await this.palabraSV.deletePalabrabyGvId(id);

    let af= this.dbf.doc<GrupoVocabulario>(`grupoVocabulario/${id}`);
    af.delete();
  }

  public createGrupoVocabulario(idioma_id:string,nombre:string,col1:string,col2:string){
    let apartado=new GrupoVocabulario();
    apartado.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    apartado.nombre=nombre;
    apartado.idioma_id=idioma_id;
    apartado.nombre_col1=col1;
    apartado.nombre_col2=col2;
    this.SetGrupoVocabularioData(apartado);
    
  }
  public createGrupoVocabularioWithID(id,idioma_id:string,nombre:string,col1:string,col2:string){
    let apartado=new GrupoVocabulario();
    apartado.id=id;
    apartado.nombre=nombre;
    apartado.idioma_id=idioma_id;
    apartado.nombre_col1=col1;
    apartado.nombre_col2=col2;
    this.SetGrupoVocabularioData(apartado);
    
  }

}
export class GrupoVocabulario{
  id:string;
  nombre:string;
  idioma_id:string;
  nombre_col1:string;
  nombre_col2:string;
}
