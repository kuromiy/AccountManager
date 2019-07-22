import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { Service } from "../../../database/models/Service";
import { store } from "../index";

@Module({dynamic: true, store, name: "servicemodule"})
class ServiceModule extends VuexModule {
  private _services: Array<Service> = new Array<Service>();

  public get services(): Array<Service> {
    return this._services;
  }

  @Mutation
  public INIT_SERVICE(services: Array<Service>) {
    this._services = services;
  }

  @Mutation
  public ADD_SERVICE(service: Service) {
    this._services.push(service);
  }

  @Mutation
  public UPDATE_SERVICE(service: Service) {
    const fService: Service | undefined = this._services.find((findService: Service) => findService._id === service._id);
    if (fService) {
      fService._name = service._name;
      fService._url = service._url;
    }
  }

  @Mutation
  public DELETE_SERVICE(service: Service) {
    this._services.forEach((fService: Service, index: number) => {
      if (fService._id === service._id) this._services.splice(index, 1);
    });
  }

  @Action
  public async initService() {
    const conn: IFConnection = await DBConnection.instance();
    const serviceTable: Table<Service> = conn.table(Service);
    const services: Array<Service> = await serviceTable.find({});
    this.INIT_SERVICE(services);
  }

  @Action
  public async addService(service: Service) {
    const conn: IFConnection = await DBConnection.instance();
    const serviceTable: Table<Service> = conn.table(Service);
    const insertServise: Service = await serviceTable.insert(service);
    this.ADD_SERVICE(insertServise);
  }

  @Action
  public async updateService(service: Service) {
    const conn: IFConnection = await DBConnection.instance();
    const serviceTable: Table<Service> = conn.table(Service);
    await serviceTable.update({_id: service._id}, {_name: service._name, _url: service._url});
    this.UPDATE_SERVICE(service);
  }

  @Action
  public async deleteService(service: Service) {
    const conn: IFConnection = await DBConnection.instance();
    const serviceTable: Table<Service> = conn.table(Service);
    await serviceTable.delete({_id: service._id});
    this.DELETE_SERVICE(service);
  }
}

const serviceModule = getModule(ServiceModule);

export { serviceModule };
