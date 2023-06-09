import { Role } from './role.model';
export class User {
   id!: number;
    email!: string;
    password!:string;
    role!:Role;
    verified!:boolean;


  }