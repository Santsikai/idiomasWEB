import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/files/file.service';
import { Idioma, IdiomaService, lang } from 'src/app/services/idioma/idioma.service';

@Component({
  selector: 'app-lista-lenguajes',
  templateUrl: './lista-lenguajes.component.html',
  styleUrls: ['./lista-lenguajes.component.scss']
})
export class ListaLenguajesComponent {
  userId;
  listIdiomas:Idioma[]=[];
  listIdiomasC:Idioma[]=[];
  nombreLeng;
  showModal=false;
  privacidad:boolean=false;
  selectedlangs=lang;
  constructor(
    private idiomaSV:IdiomaService,
    private router:Router,
    private fileSV:FileService
  ) { }

  ngOnInit() {
    this.getUserID();
    
  }

  onKey(value) { 
    this.selectedlangs = this.search(value);
    }

    search(value: string) { 
      let filter = value.toLowerCase();
      return lang.filter(option => option.code.toLowerCase().startsWith(filter));
    }
  moveToLeng(idioma:Idioma){
    localStorage.setItem('langUserID',idioma.user_id)
    localStorage.setItem('langprivacity',String(idioma.private))
    this.router.navigate(['/pages/lenguaje',idioma.id]);
  }
  public async getUserID(){
      this.userId=localStorage.getItem("logUserID");
      this.idiomaSV.getListIdiomabyUserId(this.userId ).subscribe((res:any)=>{
        this.listIdiomas=res
        this.idiomaSV.getListIdiomabyIdiomaUserId(this.userId).subscribe((r:any)=>{
          this.listIdiomasC=r
        })
      });
      
  }
  file;
  loadFile(e:any){
    this.file=e.target.files[0];
    
   }
   async confirmImport() {
    await this.fileSV.importDataFromFile(this.file,this.userId)
    this.showModal=false;
   }

  create() {

    this.idiomaSV.createIdioma(this.userId,this.nombreLeng,this.selectedLanguage,this.privacidad);
    this.nombreLeng="";
    this.showModal=false
}

searchTerm: string = '';
  filteredLanguages = lang;
  isDropdownOpen: boolean = false;
  selectedLanguage: string | null = null;

  filterLanguages() {
    this.filteredLanguages = lang.filter(language => 
      language.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectLanguage(language: { code: string, name: string }) {
    this.selectedLanguage = language.name;
    this.searchTerm = language.name;
    this.filteredLanguages = [];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInside = target.closest('.custom-select');
    if (!isInside) {
      this.isDropdownOpen = false;
    }
  }
}
