export class Formateur {
    constructor(
      
      public password:string,
      public id: number,
      public nom: string,
      public prenom: string,
      public tel: number,
      public email: string,
      public adresse: string,
      public specialite: string,
      public data :Blob,
      public file: File,
      public fileType: string,
         public archive: boolean,
      public verified: boolean,
     
      
    ) {
    }
  }