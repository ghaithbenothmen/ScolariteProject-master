
import {Formateur } from "./formateur.model";
import {ThemeDeFormation } from "./ThemeDeFormation.model";
export class SessionFormation {


    constructor(
     
      
      public idSessionFormation: number,
      public typeFormation: string,
      public localFormation: string,
      public nbrHeures: number,
      public  dateDebut : Date,
      public description: string,
      //public NbrHeures: string,
      public data :Blob,
      public file: File,
      public fileType: string,

      public formateur: Formateur,
      public codeFormateur:number,
      
      public themeDeFormation:ThemeDeFormation,
      public idFormation:number
      
    ) {
    }
  }