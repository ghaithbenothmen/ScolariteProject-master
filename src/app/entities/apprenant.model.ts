export class Apprenant {
    constructor(
      public id: number,
      public password:string,
      public nom: string,
      public prenom: string,
      public sexeApprenant: string,
      public dateNaissanceApprenant: string,
      public email: string,
      public tel: number,
      public adresse: string,
      public qualiteApprenant: string,
      public niveauApprenant: string,
      public archive: boolean,
     public verified:boolean,
    ) {
    }
  }