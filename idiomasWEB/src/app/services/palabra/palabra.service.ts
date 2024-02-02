import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  constructor(
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private dbf:AngularFirestore,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  SetPalabraData(apartado) {
    const PalabraRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `palabra/${apartado.id}`
    );
    
    const PalabraData: Palabra = {
      id: apartado.id,
      gv_id: apartado.gv_id,
      col1:apartado.col1,
      col2:apartado.col2,
    };
    return PalabraRef.set(PalabraData, {
      merge: true,
    });
  }

  public async getPalabra(id:string){
    let a=new Palabra();
     let af= this.dbf.doc<Palabra>(`palabra/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data().id;
      a.gv_id=arg.payload.data().gv_id;
      a.col1=arg.payload.data().col1;
      a.col2=arg.payload.data().col2;
    });
    return a;
  }

  public getListPalabrabyGvId(id:string){
   let b = this.dbf.collection<Palabra>('/palabra',ref => ref.where("gv_id","==",id));
    return b.valueChanges();
  }

  public editPalabra(id:string, col1:string,col2:string){
    this.dbf.doc(`palabra/${id}`).set({
      col1:col1,
      col2:col2
    },{merge:true});
    
  }
  public async deletePalabrabyGvId(id:string){
    this.getListPalabrabyGvId(id).subscribe((res:any)=>{
      res.forEach(e => {
        let af= this.dbf.doc<Palabra>(`palabra/${e.id}`);
    af.delete();
      });
      
    })
    
  }

  public async deletePalabra(id:string){
    let af= this.dbf.doc<Palabra>(`palabra/${id}`);
    af.delete();
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async createPalabra(gv_id:string,col1:string,col2:string){
    let apartado=new Palabra();
    apartado.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    apartado.gv_id=gv_id;
    apartado.col1=col1;
    apartado.col2=col2;
    await this.SetPalabraData(apartado)
    
  }
  public createPalabraWithID(id,gv_id:string,col1:string,col2:string){
    let apartado=new Palabra();
    apartado.id=id;
    apartado.gv_id=gv_id;
    apartado.col1=col1;
    apartado.col2=col2;
    this.SetPalabraData(apartado);
    
  }

}
export class Palabra{
  id:string;
  gv_id:string;
  col1:string;
  col2:string;
}
