import { Seat } from "./seat.model";

export class Theater {
    id?:number; //con el interrogatorio porque no es obligatorio
    location:string;
    capacity:number;
    seats?:Seat[];
}
