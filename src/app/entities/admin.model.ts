export class admin {
    constructor(
      public id: number,
      public password:string,
      public nom: string,
      public prenom: string,
    
      public email: string,
      public tel: number,
      public adresse: string,
   
      public archive: boolean,
      public verified: boolean
     
    ) {
    }
  }