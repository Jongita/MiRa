export class Order{
    constructor (
        public name:string,
        public email:string, 
        public id?:number,  // user.id
        public order_date?:Date,
        public products?:{
            productId:number,
            count:number,
            name:string,
            price:number
        }[]
    ){}
}