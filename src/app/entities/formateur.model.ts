export class Formateur {
    constructor(
      
      public password:string,
      public id: number,
      public nomFormateur: string,
      public prenonFormateur: string,
      public telFormateur: number,
      public email: string,
      public adresseFormateur: string,
      public specialite: string,
      public data :Blob,
      public file: File,
      public fileType: string,
      
    ) {
    }
  }