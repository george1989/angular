export class AdminUsuarios {
    id?: any;
    username?: string;
    email?: string;
    password?: string; 
    state?: any;   
    roles?: Rol[];    
}
export class Rol {
    id?: any;
    name?: string;   
  }