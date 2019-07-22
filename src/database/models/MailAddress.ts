import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class MailAddress {
  @AutoIncrementColumn public _id!: number;
  @Column public _mailaddress!: string;
  @Column public _password!: string;
  @Column public _url!: string;
}
