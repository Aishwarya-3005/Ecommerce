import { Cart as CartInterface } from "./Cart";
import { Product as ProductInterface } from "./Product";
import { User as UserInterface } from "./User";
import { Address  } from "./Address";

export interface Order{
    orderId:string;
    cartItems:CartInterface[];
    totalCartQuantity:number;
    totalCartPrice:number;
    shippingInfo:ShippingInfo;

}

export interface ShippingInfo{
    userId:string;
    userName:string;
    email:string;
    phoneNumber:string;
    shippingAddress:Address;
}