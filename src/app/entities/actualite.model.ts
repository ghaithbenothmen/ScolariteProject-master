export class Actualite {
    
    constructor(
      
      public isCollapsed = false,
      public codeActualite: number,
      public titreActualite: string,
      public descriptionActualite: string,
      public dateActualite: Date,
      public heureDebut: string,
      public  dayOfWeek: string,
      public data :Blob,
      public file: File,
      public  fileType :string,
    ) {
    }
  }