export class Actualite {
    constructor(
      
      
      public codeActualite: number,
      public titreActualite: string,
      public descriptionActualite: string,
      public dateActualite: Date,
     
      public data :Blob,
      public file: File,
      public  fileType :string,
    ) {
    }
  }