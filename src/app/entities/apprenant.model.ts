export class Apprenant {
    constructor(
      public id: number,
      
      public nomApprenant: string,
      public prenomApprenant: string,
      public sexeApprenant: string,
      public dateNaissanceApprenant: string,
      public email: string,
      public telApprenant: number,
      public adresseApprenant: string,
      public qualiteApprenant: string,
      public niveauApprenant: string,
      public archiveApprenant: boolean,
     
    ) {
    }
  }