import { SessionFormation } from "./SessionFormation.model";
import { Inscription } from "./inscription.model";

export class seance {
    
    constructor(
      
     
      public idSeanceFormation: number,
      public 	contenu: string,
      public 	heureDebut: string,
      public 	date: Date,
      public nbrHeures: number,
      public  local: string,
      public data :Blob,
      public file: File,
      public fileType: string,
      public sessionFormation: SessionFormation,
      public idSessionFormation:number,
      public inscription:Inscription[],
    ) {
    }
  }