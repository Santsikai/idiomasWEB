"use strict";(self.webpackChunkidiomasWEB=self.webpackChunkidiomasWEB||[]).push([[210],{4210:(L,p,s)=>{s.r(p),s.d(p,{ListaLenguajesModule:()=>b});var l=s(6895),g=s(6360),_=s(5861),d=s(5602),e=s(4650),m=s(1184),r=s(4006);function f(o,c){if(1&o){const t=e.EpF();e.TgZ(0,"div",2)(1,"div",8)(2,"a",9),e.NdJ("click",function(){const a=e.CHM(t).$implicit,u=e.oxw();return e.KtG(u.moveToLeng(a))}),e._UZ(3,"div",4),e.TgZ(4,"div",5),e._uU(5),e.qZA()()()()}if(2&o){const t=c.$implicit;e.xp6(5),e.hij(" ",t.nombre," ")}}function h(o,c){if(1&o){const t=e.EpF();e.TgZ(0,"div",2)(1,"div",8)(2,"a",9),e.NdJ("click",function(){const a=e.CHM(t).$implicit,u=e.oxw();return e.KtG(u.moveToLeng(a))}),e._UZ(3,"div",4),e.TgZ(4,"div",5),e._uU(5),e.qZA()()()()}if(2&o){const t=c.$implicit;e.xp6(5),e.hij(" ",t.nombre," ")}}function x(o,c){if(1&o&&(e.TgZ(0,"mat-option",20),e._uU(1),e.qZA()),2&o){const t=c.$implicit;e.Q6J("value",t.code),e.xp6(1),e.hij(" ",t.name," ")}}function C(o,c){if(1&o){const t=e.EpF();e.TgZ(0,"div",10)(1,"div",11)(2,"a",12),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.showModal=!1)}),e._uU(3,"\u2716"),e.qZA(),e.TgZ(4,"h1"),e._uU(5,"Crear nuevo Lenguaje"),e.qZA(),e.TgZ(6,"input",13),e.NdJ("change",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.loadFile(n))}),e.qZA(),e.TgZ(7,"a",14),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.confirmImport())}),e._uU(8,"Importar lenguaje"),e.qZA(),e.TgZ(9,"input",15),e.NdJ("ngModelChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.nombreLeng=n)}),e.qZA(),e.TgZ(10,"mat-form-field")(11,"mat-label"),e._uU(12,"Selecciona un idioma"),e.qZA(),e.TgZ(13,"mat-select",16),e.NdJ("valueChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.selectedLanguage=n)}),e.TgZ(14,"input",17),e.NdJ("keyup",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.onKey(n.target.value))}),e.qZA(),e.YNc(15,x,2,2,"mat-option",18),e.qZA()(),e.TgZ(16,"label")(17,"input",19),e.NdJ("ngModelChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.privacidad=n)}),e.qZA(),e._uU(18," lenguaje privado? "),e.qZA(),e._UZ(19,"p"),e.TgZ(20,"a",14),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.create())}),e._uU(21,"Crear lenguaje"),e.qZA()()()}if(2&o){const t=e.oxw();e.xp6(9),e.Q6J("ngModel",t.nombreLeng),e.xp6(4),e.Q6J("value",t.selectedLanguage),e.xp6(2),e.Q6J("ngForOf",t.selectedlangs),e.xp6(2),e.Q6J("ngModel",t.privacidad)}}const v=[{path:"",component:(()=>{class o{constructor(t,i,n){this.idiomaSV=t,this.router=i,this.fileSV=n,this.listIdiomas=[],this.listIdiomasC=[],this.showModal=!1,this.privacidad=!1,this.selectedlangs=d.KQ}ngOnInit(){this.getUserID()}onKey(t){this.selectedlangs=this.search(t)}search(t){let i=t.toLowerCase();return d.KQ.filter(n=>n.code.toLowerCase().startsWith(i))}moveToLeng(t){localStorage.setItem("langUserID",t.user_id),localStorage.setItem("langprivacity",String(t.private)),this.router.navigate(["/pages/lenguaje",t.id])}getUserID(){var t=this;return(0,_.Z)(function*(){t.userId=localStorage.getItem("logUserID"),t.idiomaSV.getListIdiomabyUserId(t.userId).subscribe(i=>{t.listIdiomas=i,t.idiomaSV.getListIdiomabyIdiomaUserId(t.userId).subscribe(n=>{t.listIdiomasC=n})})})()}loadFile(t){this.file=t.target.files[0]}confirmImport(){var t=this;return(0,_.Z)(function*(){yield t.fileSV.importDataFromFile(t.file,t.userId),t.showModal=!1})()}create(){this.idiomaSV.createIdioma(this.userId,this.nombreLeng,this.selectedLanguage,this.privacidad),this.nombreLeng="",this.showModal=!1}static#e=this.\u0275fac=function(i){return new(i||o)(e.Y36(d.Rb),e.Y36(g.F0),e.Y36(m.I))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-lista-lenguajes"]],decls:10,vars:3,consts:[[1,"ag-format-container"],[1,"ag-courses_box"],[1,"ag-courses_item"],[1,"ag-courses-item_link",3,"click"],[1,"ag-courses-item_bg"],[1,"ag-courses-item_title"],["class","ag-courses_item",4,"ngFor","ngForOf"],["class","popup","id","popup",4,"ngIf"],[1,"ag-courses-item_link"],[3,"click"],["id","popup",1,"popup"],[1,"popup__content"],[1,"close",3,"click"],["type","file",3,"change"],[1,"accept",3,"click"],["type","text","placeholder","Nombre",3,"ngModel","ngModelChange"],[3,"value","valueChange"],[3,"keyup"],[3,"value",4,"ngFor","ngForOf"],["type","checkbox",3,"ngModel","ngModelChange"],[3,"value"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"a",3),e.NdJ("click",function(){return n.showModal=!0}),e._UZ(4,"div",4),e.TgZ(5,"div",5),e._uU(6," A\xf1adir Lenguaje "),e.qZA()()(),e.YNc(7,f,6,1,"div",6),e.YNc(8,h,6,1,"div",6),e.qZA()(),e.YNc(9,C,22,4,"div",7)),2&i&&(e.xp6(7),e.Q6J("ngForOf",n.listIdiomas),e.xp6(1),e.Q6J("ngForOf",n.listIdiomasC),e.xp6(1),e.Q6J("ngIf",n.showModal))},dependencies:[l.sg,l.O5,r.Fj,r.Wl,r.JJ,r.On],styles:['@import"https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap";.ag-format-container[_ngcontent-%COMP%]{width:1142px;margin:0 auto}a[_ngcontent-%COMP%]{text-decoration:none}body[_ngcontent-%COMP%]{background-color:#000}.ag-courses_box[_ngcontent-%COMP%]{display:flex;align-items:flex-start;flex-wrap:wrap;padding:50px 0}.ag-courses_item[_ngcontent-%COMP%]{flex-basis:calc(33.33333% - 30px);margin:0 15px 30px;overflow:hidden;border-radius:28px}.ag-courses-item_link[_ngcontent-%COMP%]{display:block;padding:30px 20px;background-color:#121212;overflow:hidden;position:relative}.ag-courses-item_link[_ngcontent-%COMP%]:hover, .ag-courses-item_link[_ngcontent-%COMP%]:hover   .ag-courses-item_date[_ngcontent-%COMP%]{text-decoration:none;color:#fff}.ag-courses-item_link[_ngcontent-%COMP%]:hover   .ag-courses-item_bg[_ngcontent-%COMP%]{transform:scale(10)}.ag-courses-item_title[_ngcontent-%COMP%]{min-height:87px;margin:0 0 25px;overflow:hidden;font-weight:700;font-size:30px;color:#fff;z-index:2;position:relative}.ag-courses-item_date-box[_ngcontent-%COMP%]{font-size:18px;color:#fff;z-index:2;position:relative}.ag-courses-item_date[_ngcontent-%COMP%]{font-weight:700;color:#f9b234;transition:color .5s ease}.ag-courses-item_bg[_ngcontent-%COMP%]{height:128px;width:128px;background-color:#f9b234;z-index:1;position:absolute;top:-75px;right:-75px;border-radius:50%;transition:all .5s ease}.ag-courses_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#3ecd5e}.ag-courses_item[_ngcontent-%COMP%]:nth-child(3n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#e44002}.ag-courses_item[_ngcontent-%COMP%]:nth-child(4n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#952aff}.ag-courses_item[_ngcontent-%COMP%]:nth-child(5n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#cd3e94}.ag-courses_item[_ngcontent-%COMP%]:nth-child(6n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#4c49ea}@media only screen and (max-width: 979px){.ag-courses_item[_ngcontent-%COMP%]{flex-basis:calc(50% - 30px)}.ag-courses-item_title[_ngcontent-%COMP%]{font-size:24px}}@media only screen and (max-width: 767px){.ag-format-container[_ngcontent-%COMP%]{width:96%}}@media only screen and (max-width: 639px){.ag-courses_item[_ngcontent-%COMP%]{flex-basis:100%}.ag-courses-item_title[_ngcontent-%COMP%]{min-height:72px;line-height:1;font-size:24px}.ag-courses-item_link[_ngcontent-%COMP%]{padding:22px 40px}.ag-courses-item_date-box[_ngcontent-%COMP%]{font-size:16px}}a.close[_ngcontent-%COMP%]{width:30px;font-size:20px;color:#c0c5cb;align-self:flex-end;background-color:transparent;border:none;margin-bottom:10px;text-decoration:none}.some-text[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:800px;text-align:center;font-weight:500;font-size:24px}.pure[_ngcontent-%COMP%]{color:#e75480;text-decoration:underline;font-weight:600}a.accept[_ngcontent-%COMP%]{background-color:#ed6755;border:none;border-radius:5px;width:95%;align-items:center;padding:14px;font-size:16px;color:#fff;box-shadow:0 6px 18px -5px #ed6755;text-decoration:none}.popup[_ngcontent-%COMP%]{height:100vh;width:100%;position:fixed;top:0;left:0;background-color:#000c;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:9999;transition:all .3s}.popup__content[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20%;padding:20px;display:flex;flex-direction:column;background-color:#fff;box-shadow:0 2rem 4rem #0003;border-radius:10px;overflow:hidden}.popup__text[_ngcontent-%COMP%]{font-size:1.4rem;margin-bottom:4rem}']})}return o})()}];let M=(()=>{class o{static#e=this.\u0275fac=function(i){return new(i||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[g.Bz.forChild(v),g.Bz]})}return o})(),b=(()=>{class o{static#e=this.\u0275fac=function(i){return new(i||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[l.ez,M,r.u5]})}return o})()}}]);