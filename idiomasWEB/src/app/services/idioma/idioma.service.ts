import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GrupoVocabularioService } from '../grupoVocabulario/grupo-vocabulario.service';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';

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

  public getListIdiomabyNombre(nombre:string): Observable<any[]> {
    const nombreLowerCase = nombre.toLowerCase(); // Convertir el valor de búsqueda a minúsculas

    const collection: AngularFirestoreCollection<Idioma> = this.dbf.collection<Idioma>('/idioma',ref => ref.where("private","==",false));

    return collection.valueChanges().pipe(
      map(idiomas => {
        return idiomas.filter(idioma => idioma.nombre.toLowerCase().includes(nombreLowerCase));
      })
    );
  }
  getListIdiomabyNombreAndLenguaje(nombre: string, lenguaje: string): Observable<any[]> {
    const nombreLowerCase = nombre.toLowerCase(); // Convertir el valor de búsqueda a minúsculas

    const collection: AngularFirestoreCollection<Idioma> = this.dbf.collection<Idioma>('/idioma', ref => ref.where("lenguaje","==",lenguaje));

    return collection.valueChanges().pipe(
      map(idiomas => {
        return idiomas.filter(idioma => idioma.nombre.toLowerCase().includes(nombreLowerCase));
      })
    );
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
  public createIdiomaWithID(id,user_id:string,nombre:string,lenguaje:string,pribate:boolean){
    let apartado=new Idioma();
    apartado.id=id;
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

  public deleteAllIdiomaUserByIdioma(id:string){
    this.getListIdiomaUserByIdioma(id).subscribe((res:any)=>{
      this.deleteIdiomaUser(res.id)
    })
  }

  public createIdiomaUser(user_id:string,idioma_id:string){
    let apartado=new IdiomaUser();
    apartado.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    apartado.idioma_id=idioma_id;
    apartado.user_id=user_id;
    apartado.active=true;
    this.SetIdiomaUserData(apartado);
    
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
export const lang = [
  { code: 'aa', name: 'Afar' },
  { code: 'ab', name: 'Abkhazian' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'as', name: 'Assamese' },
  { code: 'ay', name: 'Aymara' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ba', name: 'Bashkir' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'bh', name: 'Bihari' },
  { code: 'bi', name: 'Bislama' },
  { code: 'bn', name: 'Bengali/Bangla' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'br', name: 'Breton' },
  { code: 'ca', name: 'Catalan' },
  { code: 'co', name: 'Corsican' },
  { code: 'cs', name: 'Czech' },
  { code: 'cy', name: 'Welsh' },
  { code: 'da', name: 'Danish' },
  { code: 'de', name: 'German' },
  { code: 'dz', name: 'Dzongkha' },
  { code: 'el', name: 'Greek' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'es', name: 'Spanish' },
  { code: 'et', name: 'Estonian' },
  { code: 'eu', name: 'Basque' },
  { code: 'fa', name: 'Persian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fj', name: 'Fijian' },
  { code: 'fo', name: 'Faroese' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'ga', name: 'Irish' },
  { code: 'gd', name: 'Gaelic (Scots)' },
  { code: 'gl', name: 'Galician' },
  { code: 'gn', name: 'Guarani' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'gv', name: 'Manx' },
  { code: 'ha', name: 'Hausa' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ho', name: 'Hiri Motu' },
  { code: 'hr', name: 'Croatian' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'hy', name: 'Armenian' },
  { code: 'hz', name: 'Herero' },
  { code: 'ia', name: 'Interlingua' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ie', name: 'Interlingue' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ii', name: 'Sichuan Yi' },
  { code: 'ik', name: 'Inupiak' },
  { code: 'io', name: 'Ido' },
  { code: 'is', name: 'Icelandic' },
  { code: 'it', name: 'Italian' },
  { code: 'iu', name: 'Inuktitut' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'ka', name: 'Georgian' },
  { code: 'kg', name: 'Kongo' },
  { code: 'ki', name: 'Kikuyu' },
  { code: 'kj', name: 'Kuanyama' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'kl', name: 'Greenlandic' },
  { code: 'km', name: 'Cambodian' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ko', name: 'Korean' },
  { code: 'kr', name: 'Kanuri' },
  { code: 'ks', name: 'Kashmiri' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'kv', name: 'Komi' },
  { code: 'kw', name: 'Cornish' },
  { code: 'ky', name: 'Kirghiz' },
  { code: 'la', name: 'Latin' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'lg', name: 'Ganda' },
  { code: 'li', name: 'Limburgish' },
  { code: 'ln', name: 'Lingala' },
  { code: 'lo', name: 'Laothian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lu', name: 'Luba-Katanga' },
  { code: 'lv', name: 'Latvian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'mh', name: 'Marshallese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'mo', name: 'Moldavian' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ms', name: 'Malay' },
  { code: 'mt', name: 'Maltese' },
  { code: 'my', name: 'Burmese' },
  { code: 'na', name: 'Nauru' },
  { code: 'nb', name: 'Norwegian (Bokmal)' },
  { code: 'nd', name: 'North Ndebele' },
  { code: 'ne', name: 'Nepali' },
  { code: 'ng', name: 'Ndonga' },
  { code: 'nl', name: 'Dutch' },
  { code: 'nn', name: 'Norwegian (Nynorsk)' },
  { code: 'no', name: 'Norwegian' },
  { code: 'nr', name: 'South Ndebele' },
  { code: 'nv', name: 'Navajo' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'oc', name: 'Occitan' },
  { code: 'oj', name: 'Ojibwa' },
  { code: 'om', name: 'Oromo' },
  { code: 'or', name: 'Oriya' },
  { code: 'os', name: 'Ossetian' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'pi', name: 'Pali' },
  { code: 'pl', name: 'Polish' },
  { code: 'ps', name: 'Pashto' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'qu', name: 'Quechua' },
  { code: 'rm', name: 'Rhaeto-Romance' },
  { code: 'rn', name: 'Kirundi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'sc', name: 'Sardinian' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'se', name: 'Northern Sami' },
  { code: 'sg', name: 'Sango' },
  { code: 'sh', name: 'Serbo-Croatian' },
  { code: 'si', name: 'Sinhalese' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'sn', name: 'Shona' },
  { code: 'so', name: 'Somali' },
  { code: 'sq', name: 'Albanian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'ss', name: 'Siswati' },
  { code: 'st', name: 'Sesotho' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sv', name: 'Swedish' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'tg', name: 'Tajik' },
  { code: 'th', name: 'Thai' },
  { code: 'ti', name: 'Tigrinya' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'tn', name: 'Tswana' },
  { code: 'to', name: 'Tonga' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ts', name: 'Tsonga' },
  { code: 'tt', name: 'Tatar' },
  { code: 'tw', name: 'Twi' },
  { code: 'ty', name: 'Tahitian' },
  { code: 'ug', name: 'Uighur' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'uz', name: 'Uzbek' },
  { code: 've', name: 'Venda' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'vo', name: 'Volapük' },
  { code: 'wa', name: 'Walloon' },
  { code: 'wo', name: 'Wolof' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'za', name: 'Zhuang' },
  { code: 'zh', name: 'Chinese' },
  { code: 'zu', name: 'Zulu' }
];