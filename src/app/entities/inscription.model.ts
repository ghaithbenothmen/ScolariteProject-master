import { SessionFormation } from "./SessionFormation.model";
import { Apprenant } from "./apprenant.model";

export class Inscription  {
    constructor(
      
     

      public codeInscription: number,
      public sessionFormation:SessionFormation,

      public apprenant: Apprenant,
     
      public idSessionFormation: number,
      public id:number,
    ) {
    }
  }