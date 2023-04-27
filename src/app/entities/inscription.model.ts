import { SessionFormation } from "./SessionFormation.model";
import { Apprenant } from "./apprenant.model";

export class inscription  {
    constructor(
      
     
      public CodeInscriptionSession: number,
      public sessionFormation:SessionFormation,
      public apprenant: Apprenant,
     
      
    ) {
    }
  }