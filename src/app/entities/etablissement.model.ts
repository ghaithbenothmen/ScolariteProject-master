export class Etablissement {
    constructor(
      
      public codeEtablissement: number,
      public nomEtablissement: string,
      public abreviationEtablissement: string,
      public telEtablissement: number,
      public emailEtablissement: string,
      public remarqueEtablissement: string,
      public imageEtablissement: File,
    ) {
    }
  }