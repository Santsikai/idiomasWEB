import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GrupoVocabularioService } from '../grupoVocabulario/grupo-vocabulario.service';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private dbf:AngularFirestore,
    private gvSV:GrupoVocabularioService,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  SetIdiomaData(apartado) {
    const IdiomaRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `idioma/${apartado.id}`
    );
    
    const IdiomaData: Idioma = {
      id: apartado.id,
      user_id: apartado.user_id,
      nombre: apartado.nombre,
    };
    return IdiomaRef.set(IdiomaData, {
      merge: true,
    });
  }

  public async getIdioma(id:string){
    let a=new Idioma();
     let af= this.dbf.doc<Idioma>(`idioma/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data().id;
      a.nombre=arg.payload.data().nombre;
      a.user_id=arg.payload.data().user_id;
    });
    return a;
  }

  public getListIdiomabyUserId(id:string){
   let b = this.dbf.collection<Idioma>('/idioma',ref => ref.where("user_id","==",id));
    return b.valueChanges();
  }

  public editIdioma(id:string, newname:string){
    this.dbf.doc(`idioma/${id}`).set({
      nombre:newname,
    },{merge:true});
    
  }

  public async deleteIdioma(id:string){
    debugger;
     await this.gvSV.deleteGrupoVocabulariobyIdiomaId(id);

    let af= this.dbf.doc<Idioma>(`idioma/${id}`);
    af.delete();
  }

  public createIdioma(user_id:string,nombre:string){
    let apartado=new Idioma();
    apartado.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    apartado.nombre=nombre;
    apartado.user_id=user_id;
    this.SetIdiomaData(apartado);
    
  }
  public createIdiomaWithID(id,user_id:string,nombre:string){
    let apartado=new Idioma();
    apartado.id=id;
    apartado.nombre=nombre;
    apartado.user_id=user_id;
    this.SetIdiomaData(apartado);
    
  }

}
export class Idioma{
  id:string;
  nombre:string;
  user_id:string;
}
