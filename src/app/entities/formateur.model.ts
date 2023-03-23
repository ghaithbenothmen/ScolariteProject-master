export class formateur {
    constructor(
      
      
      public codeFormateur: number,
      public nomFormateur: string,
      public prenonFormateur: string,
      public telFormateur: number,
      public emailFormateur: string,
      public adresseFormateur: string,
      public specialite: string,
      public data :Blob,
      public file: File,
      public fileType: string,
      
    ) {
    }
  }