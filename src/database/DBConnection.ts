import { remote } from "electron";
import path from "path";
import { IFConnection, TypeFileDB } from "typefiledb";

export class DBConnection {
  public static instance(): Promise<IFConnection> {
    return new Promise(async (resolve, reject) => {
      if (!this._conn) {
        const db: TypeFileDB = new TypeFileDB();
        this._conn = await db.connection(path.join(remote.app.getPath("exe"), "db"));
      }
      resolve(this._conn);
    });
  }
  private static _conn: IFConnection;
  private constructor() {}
}
