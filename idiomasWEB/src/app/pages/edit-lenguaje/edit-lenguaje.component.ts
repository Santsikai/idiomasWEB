import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from 'src/app/services/grupoVocabulario/grupo-vocabulario.service';
import { Idioma, IdiomaService } from 'src/app/services/idioma/idioma.service';
import { Palabra, PalabraService } from 'src/app/services/palabra/palabra.service';

@Component({
  selector: 'app-edit-lenguaje',
  templateUrl: './edit-lenguaje.component.html',
  styleUrls: ['./edit-lenguaje.component.scss']
})
export class EditLenguajeComponent implements OnInit{
  idioma:Idioma;
  idiomaCopy:Idioma;
  listgv:GrupoVocabulario[]=[];
  id:any;
  listPalabra:Palabra[]=[];
  listPalabraCopy:Palabra[]=[];
  gv:GrupoVocabulario;
  gvCopy:GrupoVocabulario;
  showEditGV=false;
  
  constructor(
    private ARoute:ActivatedRoute,
    private idiomaSV:IdiomaService,
    private palabraSV:PalabraService,
    private gvSV:GrupoVocabularioService,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('lengid').replace(/%20/g, " ");
    this.getListaGV();
    
  }

  async getIdioma(){
    this.idioma= await this.idiomaSV.getIdioma(this.id);
    this.idiomaCopy={...this.idioma};
  }
  getListaGV(){
    this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe((res:any)=>{
      debugger;
      this.getIdioma();
      this.listgv=res;
    })
  }

  getListPalabras(gv){
    this.gv=gv;
    this.gvCopy={ ...gv};
    this.palabraSV.getListPalabrabyGvId(gv.id).subscribe((res:any)=>{
      this.listPalabra = JSON.parse(JSON.stringify(res));
      this.listPalabraCopy = JSON.parse(JSON.stringify(this.listPalabra));
      this.showEditGV=true;
    })
  }

  guardar(){
    debugger;
    if(this.idioma.nombre!=this.idiomaCopy.nombre){
        this.idiomaSV.editIdioma(this.idioma.id,this.idioma.nombre,this.idioma.lenguaje,this.idioma.private)
    }if(this.gv.nombre!=this.gvCopy.nombre || this.gv.nombre_col1!=this.gvCopy.nombre_col1 || this.gv.nombre_col2!=this.gvCopy.nombre_col2){
        this.gvSV.editGrupoVocabulario(this.gv.id,this.gv.nombre,this.gv.nombre_col1,this.gv.nombre_col2)
    }this.listPalabra.forEach((p:Palabra, index)=>{
      if(p.col1!=this.listPalabraCopy[index].col1 || p.col2!=this.listPalabraCopy[index].col2){
        this.palabraSV.editPalabra(p.id,p.col1,p.col2)
      }
    })
  }
  lang = [
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
}
