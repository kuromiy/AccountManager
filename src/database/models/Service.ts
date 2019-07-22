import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class Service {
  @AutoIncrementColumn public _id!: number;
  @Column public _name!: string;
  @Column public _url!: string;
}
