import { SessionFormation } from "./SessionFormation.model";

export class seance {
    
    constructor(
      
     
      public idSeanceFormation: number,
      public 	contenu: string,
      public 	heuresDebut: number,
      public 	date: Date,
      public nbrHeures: number,
      public  local: string,
      public data :Blob,
      public file: File,
      public fileType: string,
      public sessionFormation: SessionFormation,
      public idSessionFormation:number
    ) {
    }
  }