import { Role } from './role.model';
export class User {
   id!: number;
    email!: string;
    password!:string;
    role!:Role;
    verified!:boolean;
    archive!:boolean;
nom!:string;
prenom!:string;
tel!:string;
  }