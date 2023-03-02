export class Departement {
    constructor(
      
      
      public codeDepartement: number,
      public nomDepartement: string,
      public abreviationDepartement: string,
      public telDepartement: number,
      public emailDepartement: string,
      public remarqueDepartement: string,
      public data :Blob,
      public file: File,
      public  fileType :string,
    ) {
    }
  }