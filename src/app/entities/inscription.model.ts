import { SessionFormation } from "./SessionFormation.model";
import { Apprenant } from "./apprenant.model";

export class Inscription  {
    constructor(
      
     
      public CodeInscriptionSession: number,
      public SesionDeFormation:SessionFormation,
      public apprenant: Apprenant,
     
      public idSessionFormation: number,
      public id:number,
    ) {
    }
  }