import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GrupoVocabularioService } from '../grupoVocabulario/grupo-vocabulario.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

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
      lenguaje: apartado.lenguaje,
      private:apartado.private
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
      a.lenguaje=arg.payload.data().lenguaje;
      a.private=arg.payload.data().private;
    });
    return a;
  }

  public getListIdiomabyUserId(id:string){
   let b = this.dbf.collection<Idioma>('/idioma',ref => ref.where("user_id","==",id));
    return b.valueChanges();
  }

  getListIdiomabyIdiomaUserId(userId: string): Observable<any[]> {
    return this.getListIdiomaUserByUser(userId).pipe(
      switchMap((res: any[]) => {
        const observables = res.map(idiouser => this.getIdioma(idiouser.idioma_id));
        return forkJoin(observables);
      })
    );
  }

  public editIdioma(id:string, newname:string,lenguaje:string, pribate:boolean){
    this.dbf.doc(`idioma/${id}`).set({
      nombre:newname,
      lenguaje:lenguaje,
      private:pribate
    },{merge:true});
    
  }

  public async deleteIdioma(id:string){
    debugger;
     await this.gvSV.deleteGrupoVocabulariobyIdiomaId(id);

    let af= this.dbf.doc<Idioma>(`idioma/${id}`);
    af.delete();
  }

  public createIdioma(user_id:string,nombre:string,lenguaje:string,pribate:boolean){
    let apartado=new Idioma();
    apartado.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    apartado.nombre=nombre;
    apartado.user_id=user_id;
    apartado.lenguaje=lenguaje;
    apartado.private=pribate;
    this.SetIdiomaData(apartado);
    
  }

  //getidiomasuser
  SetIdiomaUserData(apartado) {
    const IdiomaRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `idioma-user/${apartado.id}`
    );
    
    const IdiomaData: IdiomaUser = {
      id: apartado.id,
      user_id: apartado.user_id,
      idioma_id: apartado.idioma_id,
      active: apartado.active,
    };
    return IdiomaRef.set(IdiomaData, {
      merge: true,
    });
  }
  public editIdiomaUserChangePrivacy(id:string, act:boolean){
    this.dbf.doc(`idioma/${id}`).set({
      active:act,
    },{merge:true});
    
  }
  public async getIdiomaUser(id:string){
    let a=new IdiomaUser();
     let af= this.dbf.doc<IdiomaUser>(`idioma-user/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data().id;
      a.idioma_id=arg.payload.data().idioma_id;
      a.user_id=arg.payload.data().user_id;
      a.active=arg.payload.data().active;
    });
    return a;
  }

  public getListIdiomaUserByIdioma(id:string){
   let b = this.dbf.collection<IdiomaUser>('/idioma-user',ref => ref.where("idioma_id","==",id));
    return b.valueChanges();
  }
  public getListIdiomaUserByUser(id:string){
    let b = this.dbf.collection<IdiomaUser>('/idioma-user',ref => ref.where("user_id","==",id).where("active","==",true));
     return b.valueChanges();
   }
   public getListIdiomaUserByIdiomaandUser(id:string,user:string){
    let b = this.dbf.collection<IdiomaUser>('/idioma-user',ref => ref.where("idioma_id","==",id).where("user_id","==",user).limit(1));
     return b.valueChanges();
   }
  public async deleteIdiomaUser(id:string){
    let af= this.dbf.doc<IdiomaUser>(`idioma-user/${id}`);
    af.delete();
  }

  public createIdiomaUser(user_id:string,idioma_id:string){
    let apartado=new IdiomaUser();
    apartado.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    apartado.idioma_id=idioma_id;
    apartado.user_id=user_id;
    apartado.active=true;
    this.SetIdiomaData(apartado);
    
  }

}
export class Idioma{
  id:string;
  nombre:string;
  user_id:string;
  lenguaje:string;
  private:boolean;
}
export class IdiomaUser{
  id:string;
  idioma_id:string;
  user_id:string;
  active:boolean;
}
