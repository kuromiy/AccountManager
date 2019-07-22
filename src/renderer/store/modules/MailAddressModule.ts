import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { MailAddress } from "../../../database/models/MailAddress";
import { store } from "../index";

@Module({dynamic: true, store, name: "mailaddressmodule"})
class MailAddressModule extends VuexModule {
  private _mailaddresses: Array<MailAddress> = new Array<MailAddress>();

  public get mailaddresses(): Array<MailAddress> {
    return this._mailaddresses;
  }

  @Mutation
  public INIT_MAIL_ADDRESS(mailaddress: Array<MailAddress>) {
    this._mailaddresses = mailaddress;
  }

  @Mutation
  public ADD_MAIL_ADDRESS(mailaddress: MailAddress) {
    this._mailaddresses.push(mailaddress);
  }

  @Mutation
  public UPDATE_MAIL_ADDRESS(mailaddress: MailAddress) {
    const fMailAddress: MailAddress | undefined = this._mailaddresses.find((findMailAddress: MailAddress) => findMailAddress._id === mailaddress._id);
    if (fMailAddress) {
      fMailAddress._mailaddress = mailaddress._mailaddress;
      fMailAddress._password = mailaddress._password;
      fMailAddress._url = mailaddress._url;
    }
  }

  @Mutation
  public DELETE_MAIL_ADDRESS(mailaddress: MailAddress) {
    this._mailaddresses.forEach((fMailAddress: MailAddress, index: number) => {
      if (fMailAddress._id === mailaddress._id) this._mailaddresses.splice(index, 1);
    });
  }

  @Action
  public async initMailAddress() {
    const conn: IFConnection = await DBConnection.instance();
    const mailAddressTable: Table<MailAddress> = conn.table(MailAddress);
    const mailAddresses: Array<MailAddress> = await mailAddressTable.find({});
    this.INIT_MAIL_ADDRESS(mailAddresses);
  }

  @Action
  public async addMailAddress(mailAddress: MailAddress) {
    const conn: IFConnection = await DBConnection.instance();
    const mailAddressTable: Table<MailAddress> = conn.table(MailAddress);
    const insertMailAddress: MailAddress = await mailAddressTable.insert(mailAddress);
    this.ADD_MAIL_ADDRESS(insertMailAddress);
  }

  @Action
  public async updateMailAddress(mailAddress: MailAddress) {
    const conn: IFConnection = await DBConnection.instance();
    const mailAddressTable: Table<MailAddress> = conn.table(MailAddress);
    await mailAddressTable.update({_id: mailAddress._id}, {});
    this.UPDATE_MAIL_ADDRESS(mailAddress);
  }

  @Action
  public async deleteMailAddress(mailAddress: MailAddress) {
    const conn: IFConnection = await DBConnection.instance();
    const mailAddressTable: Table<MailAddress> = conn.table(MailAddress);
    await mailAddressTable.delete({_id: mailAddress._id});
    this.DELETE_MAIL_ADDRESS(mailAddress);
  }
}

const mailAddressModule = getModule(MailAddressModule);

export { mailAddressModule };
