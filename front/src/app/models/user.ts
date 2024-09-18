export class User{
   
    constructor(
    public email:string,
    public id?:number,
    public name?:string,
 
    public password?:string,
    public type?:number,
    public token?:string,
    public img?:string
    ){}

    public getTypeName():String{
        switch (this.type){
            case 0:
                return "Super administratorius"
            case 1:
                return "Administratorius";
            case 2: 
                return "Vartotojas";
        }
        return "Nezinomas";   

}
}