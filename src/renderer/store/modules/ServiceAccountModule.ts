import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { ServiceAccount } from "../../../database/models/ServiceAccount";
import { store } from "../index";

@Module({dynamic: true, store, name: "serviceaccountmodule"})
class ServiceAccountModule extends VuexModule {
  private _serviceAccounts: Array<ServiceAccount> = new Array<ServiceAccount>();

  public get serviceAccounts(): Array<ServiceAccount> {
    return this._serviceAccounts;
  }

  @Mutation
  public INIT_SERVICE_ACCOUNT(serviceAccounts: Array<ServiceAccount>) {
    this._serviceAccounts = serviceAccounts;
  }

  @Mutation
  public ADD_SERVICE_ACCOUNT(serviceAccount: ServiceAccount) {
    this._serviceAccounts.push(serviceAccount);
  }

  @Mutation
  public UPDATE_SERVICE_ACCOUNT(serviceAccount: ServiceAccount) {
    const fServiceAccount: ServiceAccount | undefined
      = this._serviceAccounts.find((findServiceAccount: ServiceAccount) => findServiceAccount._id === serviceAccount._id);
    if (fServiceAccount) {
      fServiceAccount._service_id = serviceAccount._service_id;
      fServiceAccount._mailaddress_id = serviceAccount._mailaddress_id;
      fServiceAccount._password = serviceAccount._password;
      fServiceAccount._memo = serviceAccount._memo;
    }
  }

  @Mutation
  public DELETE_SERVICE_ACCOUNT(serviceAccount: ServiceAccount) {
    this._serviceAccounts.forEach((fServiceAccount: ServiceAccount, index: number) => {
      if (fServiceAccount._id === serviceAccount._id) this._serviceAccounts.splice(index, 1);
    });
  }

  @Action
  public async initServiceAccount() {
    const conn: IFConnection = await DBConnection.instance();
    const serviceAccountTable: Table<ServiceAccount> = conn.table(ServiceAccount);
    const serviceAccounts: Array<ServiceAccount> = await serviceAccountTable.find({});
    this.INIT_SERVICE_ACCOUNT(serviceAccounts);
  }

  @Action
  public async addServiceAccount(serviceAccount: ServiceAccount) {
    const conn: IFConnection = await DBConnection.instance();
    const serviceAccountTable: Table<ServiceAccount> = conn.table(ServiceAccount);
    const insertServiceAccount: ServiceAccount = await serviceAccountTable.insert(serviceAccount);
    this.ADD_SERVICE_ACCOUNT(insertServiceAccount);
  }

  @Action
  public async updateServiceAccount(serviceAccount: ServiceAccount) {
    const conn: IFConnection = await DBConnection.instance();
    const serviceAccountTable: Table<ServiceAccount> = conn.table(ServiceAccount);
    await serviceAccountTable.update({
      _id: serviceAccount._id,
    }, {
      _mailaddress_id: serviceAccount._mailaddress_id,
      _memo: serviceAccount._memo,
      _password: serviceAccount._password,
      _service_id: serviceAccount._service_id,
    });
    this.UPDATE_SERVICE_ACCOUNT(serviceAccount);
  }

  @Action
  public async deleteServiceAccount(serviceAccount: ServiceAccount) {
    const conn: IFConnection = await DBConnection.instance();
    const serviceAccountTable: Table<ServiceAccount> = conn.table(ServiceAccount);
    await serviceAccountTable.delete({_id: serviceAccount._id});
    this.DELETE_SERVICE_ACCOUNT(serviceAccount);
  }
}

const serviceAccountModule = getModule(ServiceAccountModule);

export { serviceAccountModule };
