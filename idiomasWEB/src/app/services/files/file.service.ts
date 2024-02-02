import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { IdiomaService } from '../idioma/idioma.service';
import { formatDate } from '@angular/common';
import { GrupoVocabularioService } from '../grupoVocabulario/grupo-vocabulario.service';
import { PalabraService } from '../palabra/palabra.service';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    @Inject(LOCALE_ID) private locale: string, 
    private idiomaSV:IdiomaService,
    private gvSV:GrupoVocabularioService,
    private palabraSV:PalabraService
  ) { }

  async importDataFromFile(file: any, user_id: any) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = reader.result as string;
      let jsonData = JSON.parse(fileContent);
      let idiomaid = String(formatDate(Date.now(), 'yyyy-MM-dd mm:ss', this.locale));
      await this.idiomaSV.createIdiomaWithID(idiomaid, user_id, jsonData.idioma.nombre);

      for (const gv of jsonData.idioma.gv) {
        await this.delay(1000);
        let gvid = String(formatDate(Date.now(), 'yyyy-MM-dd mm:ss', this.locale));
        await this.gvSV.createGrupoVocabularioWithID(gvid, idiomaid, gv.nombre, gv.nombre_col1, gv.nombre_col2);

        for (const palabra of gv.palabras) {
          await this.delay(1000);
          await this.createPalabras(gvid, palabra);
        }
      }
    };

    reader.readAsText(file);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  async createPalabras(gvid,palabra){
    await this.palabraSV.createPalabra(gvid,palabra.col1,palabra.col2);
  }
  async getIdioma(idioma_id){
    return await this.idiomaSV.getIdioma(idioma_id);
    
  }
  async getData(idioma_id:any){
    let json={idioma:{
      nombre:'',
      gv:[]
    }};
    let lengGV=0;
    let cont=0;
  let i=await this.getIdioma(idioma_id);
  this.gvSV.getListGrupoVocabulariobyIdiomaId(idioma_id).subscribe((res:any)=>{
    json.idioma.nombre=i.nombre;
    lengGV=res.length;
    for (const gv of res) {
      let jsonGv={nombre:gv.nombre,nombre_col1:gv.nombre_col1,nombre_col2:gv.nombre_col2,palabras:[]}
      this.palabraSV.getListPalabrabyGvId(gv.id).subscribe((r:any)=>{
        r.forEach(p => {
          jsonGv.palabras.push({col1:p.col1,col2:p.col2})
        });
        json.idioma.gv.push(jsonGv);
        cont=cont+1;
        if(lengGV==cont){
          
          this.exportDataToFile(json)
        }
      });
      
    }
  }) 
}


async exportDataToFile(dataGenerated:any){
  try {
  const jsonString = JSON.stringify(dataGenerated);
  const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
  const fileName = `${dataGenerated.idioma.nombre}-${currentDate}.json`;
  const documentsDirectory = await Filesystem.getUri({
    directory: Directory.Documents,
    path: fileName
  });
   // Escribir el archivo JSON
   const writeResult = await Filesystem.writeFile({
    path: fileName,
    data: jsonString,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
    recursive: true
  });
  if (writeResult) {
    console.log('Archivo JSON guardado exitosamente.');
  } else {
    console.error('Error al guardar el archivo JSON.');
  }
} catch (error) {
  console.error('Error al guardar el archivo JSON:', error);
}
}



}
