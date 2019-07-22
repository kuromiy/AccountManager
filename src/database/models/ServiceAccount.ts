import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class ServiceAccount {
  @AutoIncrementColumn public _id!: number;
  @Column public _service_id!: number;
  @Column public _mailaddress_id!: number;
  @Column public _password!: string;
  @Column public _memo!: string;
}
