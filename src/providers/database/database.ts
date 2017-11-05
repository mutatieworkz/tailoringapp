import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'tailoring.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fillDatabase() {
    this.http.get('assets/dummyDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  //#region Customer Manipulation
  addCustomer(name, gender, age, address, phone, DOB) {
    let data = [name, gender, age, address, phone, DOB, new Date()]
    return this.database.executeSql("INSERT INTO Customer (Name, Gender, Age, Address, Phone, DOB, CreatedOn) VALUES (?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  editCustomer(id, name, gender, age, address, phone, DOB) {
    let data = [name, gender, age, address, phone, DOB]
    return this.database.executeSql("UPDATE Customer SET Name=?, Gender=?, Age=?, Address=?, Phone=?, DOB=? WHERE Id=" + id, data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getAllCustomers() {
    return this.database.executeSql("SELECT * FROM Customer", []).then((data) => {
      let customers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          customers.push({
            Id: data.rows.item(i).Id,
            Name: data.rows.item(i).Name,
            Gender: data.rows.item(i).Gender,
            Age: data.rows.item(i).Age,
            Address: data.rows.item(i).Address,
            Phone: data.rows.item(i).Phone,
            DOB: data.rows.item(i).DOB,
            CreatedOn: data.rows.item(i).CreatedOn
          });
        }
      }
      return customers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getCustomerById(id) {
    return this.database.executeSql("SELECT * FROM Customer WHERE Id=?", [id]).then((data) => {
      let customers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          customers.push({
            Id: data.rows.item(i).Id,
            Name: data.rows.item(i).Name,
            Gender: data.rows.item(i).Gender,
            Age: data.rows.item(i).Age,
            Address: data.rows.item(i).Address,
            Phone: data.rows.item(i).Phone,
            DOB: data.rows.item(i).DOB,
            CreatedOn: data.rows.item(i).CreatedOn
          });
        }
      }
      return customers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getCustomerCount() {
    return this.database.executeSql("SELECT Gender, COUNT(Id) as Count from Customer GROUP BY gender", []).then((data) => {
      let count = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          count.push({
            Gender: data.rows.item(i).Gender,
            Count: data.rows.item(i).Count
          });
        }
      }
      return count;
    }, err => {
      return [];
    });
  }
  //#endregion

  //#region Mearurement Type Manipulations
  getMeasurementType() {
    return this.database.executeSql("SELECT * FROM Measurement_Type", []).then(data => {
      let type = [];
      for (var i = 0; i < data.rows.length; i++) {
        type.push({
          Id: data.rows.item(i).Id,
          Name: data.rows.item(i).Name,
          CreatedOn: data.rows.item(i).CreatedOn
        });
      }
      return type;
    }, err => {
      console.log('Error:', err);
      return [];
    });
  }


  addMeasurementType(type) {
    return this.database.executeSql("INSERT INTO Measurement_Type(Name,CreatedOn) VALUES (?,?)", [type, new Date()]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  UpdateMeasurementType(type, id) {
    return this.database.executeSql("UPDATE Measurement_Type SET Name=? WHERE Id=" + id, [type]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getMeasurementTypeById(id) {
    return this.database.executeSql("SELECT * FROM Measurement_Type WHERE Id=?", [id]).then(data => {
      let type = [];
      for (var i = 0; i < data.rows.length; i++) {
        type.push({
          Id: data.rows.item(i).Id,
          Name: data.rows.item(i).Name,
          CreatedOn: data.rows.item(i).CreatedOn
        });
      }
      return type;
    }, err => {
      console.log('Error:', err);
      return [];
    });
  }

  //#endregion

  //#region  Measurement Name Manipulation
  addMeasurementName(name, type_id) {
    return this.database.executeSql("INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES (?, ?, ?)", [name, type_id, new Date()]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  UpdateMeasurementName(name, type_id, id) {
    return this.database.executeSql("UPDATE Measurement_Name SET Name=?, Type_Id=? WHERE Id=" + id, [name, type_id]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getMeasurementName() {
    return this.database.executeSql("SELECT MN.Id as Id, MN.Name as Name, MN.Type_Id as Type_Id , MN.CreatedOn as CreatedOn, MT.Name as MeasurementName FROM Measurement_Name as MN, Measurement_Type as MT WHERE MN.Type_Id == MT.Id", []).then(data => {
      let type = [];
      for (var i = 0; i < data.rows.length; i++) {
        type.push({
          Id: data.rows.item(i).Id,
          Name: data.rows.item(i).Name,
          TypeID: data.rows.item(i).Type_Id,
          CreatedOn: data.rows.item(i).CreatedOn,
          TypeName: data.rows.item(i).MeasurementName
        });
      }
      return type;
    }, err => {
      console.log('Error:', err);
      return [];
    });
  }


  getMeasurementNameDetailsByTypeId(type_id) {
    return this.database.executeSql("SELECT MN.Id as NameId, MN.Name as Name, MT.Id as TypeId FROM Measurement_Name as MN, Measurement_Type as MT WHERE MN.Type_ID==MT.Id and MT.Id=?", [type_id])
      .then(data => {
        let measurement = [];
        for (var i = 0; i < data.rows.length; i++) {
          measurement.push({
            NameId: data.rows.item(i).NameId,
            Name: data.rows.item(i).Name,
            TypeId: data.rows.item(i).TypeId,
            Value: null,
            ValueTypeId: 1
          });
        }
        return measurement;
      },
      err => {
        console.log(err);
        return err;
      });
  }

  //#endregion

  //#region  Measurement Value Type Manipulations
  getMeasurementValueType() {
    return this.database.executeSql("SELECT * FROM Measurement_Value_Type", []).then(data => {
      let valueType = [];
      for (var i = 0; i < data.rows.length; i++) {
        valueType.push({
          Id: data.rows.item(i).Id,
          Name: data.rows.item(i).Name,
          CreatedOn: data.rows.item(i).CreatedOn
        });
      }
      return valueType;
    }, err => {
      return err;
    });
  }

  //#endregion

  //#region Measurements Manipluations

  getMeasurementsByOrderId(id) {
    return this.database.executeSql("SELECT M.Order_id, M.Qty, MT.Id as TypeId, MT.Name, Max(M.CreatedOn) as CreatedOn from Measurement as M, Measurement_Name as MN, Measurement_Type as MT WHERE M.Name_Id==MN.Id AND MN.Type_Id==MT.Id AND M.Order_id==? GROUP BY MT.Name, MT.Id, M.Order_id order by MT.Id", [id]).then((data) => {
      let measurement = [];
      for (var i = 0; i < data.rows.length; i++) {
        measurement.push({
          TypeId: data.rows.item(i).TypeId,
          Qty: data.rows.item(i).Qty,
          Name: data.rows.item(i).Name,
          CreatedOn: data.rows.item(i).CreatedOn
        });
      }
      return measurement;
    }, err => {
      console.log('Error:', err);
      return [];
    });
  }


  addMeasurements(orderId, measurement) {
    let success: boolean = false;
    return this.database.executeSql("INSERT INTO Measurement(Order_Id, Name_Id, Value_Type_Id, Value, Sequence_No, Qty, CreatedOn) VALUES(?,?,?,?,?,?,?)",
      [orderId, measurement.NameId, measurement.ValueTypeId, measurement.Value = measurement.Value == null ? 0 : measurement.Value, measurement.Sequence_No, measurement.Qty, new Date()]).then(data => {
        return success = true;
      }, err => {
        success = false;
        return err;
      })
  }

  getMeasurementSequenceNo(order_id) {
    return this.database.executeSql("SELECT Max(Sequence_No) as No FROM Measurement WHERE Order_Id==?  GROUP BY Order_Id ORDER BY Sequence_No DESC", [order_id])
      .then(data => {
        if (data.rows.length > 0) {
          let no = data.rows.item(0).No;
          return no == NaN ? 0 : no;
        }
        else {
          return 0;
        }
      },
      err => {
        console.log(err);
        return null;
      })
  }

  checkMeasurementAvaiableByTypeForOrder(type_id, Order_id) {
    return this.database.executeSql("SELECT * FROM Measurement WHERE Order_Id==? AND Name_Id==? GROUP BY Order_Id,Name_Id", [Order_id, type_id])
      .then(data => {
        if (data.rows.length > 0)
          return true;
        else
          return false;
      }, err => {
        console.log(err);
        return null;
      });
  }

  getMeasurementDetails(order_id, Name_Id) {
    return this.database.executeSql("SELECT M.*,MN.Name as Name,MT.Name as TypeName, MVT.Name as ValueName FROM Measurement as M, Measurement_Name as MN, Measurement_Type as MT, Measurement_Value_Type as MVT WHERE M.Name_Id==MN.Id AND MN.Type_Id==MT.Id AND M.Value_Type_Id==MVT.Id AND M.Order_id==? AND MT.Id=?", [order_id, Name_Id])
      .then(data => {
        let measurements = [];
        for (var i = 0; i < data.rows.length; i++) {
          measurements.push({
            Id: data.rows.item(i).Id,
            OrderId: data.rows.item(i).Order_Id,
            NameId: data.rows.item(i).Name_Id,
            ValueTypeId: data.rows.item(i).Value_Type_Id,
            Value: data.rows.item(i).Value,
            Name: data.rows.item(i).Name,
            TypeName: data.rows.item(i).TypeName,
            ValueName: data.rows.item(i).ValueName
          });
        }
        return measurements;
      }, err => {
        console.log(err);
        return null;
      });
  }

  deleteMeasurements(id) {
    return this.database.executeSql("DELETE FROM Measurement WHERE Id=?", [id])
      .then(data => {
        return data;
       }, err => {
        console.log(err);
         return err;
      })
  }

  //#endregion


  //#region Order Manipulation

  addOrder(customer_id) {
    return this.database.executeSql("INSERT INTO Orders(OrderDate, Customer_Id, Status_Id, CreatedOn) VALUES (?, ?, ?, ?)", [new Date(), customer_id, 1, new Date()])
      .then(data => {
        return data;
      }, err => {
        console.log(err);
        return null;
      });
  }

  getOrderByCustomer(customer_id) {
    return this.database.executeSql("SELECT O.*, OS.Status FROM Orders as O, OrderStatus as OS WHERE O.Status_Id==OS.Id AND Customer_Id=?", [customer_id])
      .then(data => {
        let orders = [];
        for (var i = 0; i < data.rows.length; i++) {
          orders.push({
            Id: data.rows.item(i).Id,
            OrderDate: data.rows.item(i).OrderDate,
            CustomerId: data.rows.item(i).Customer_Id,
            StatusId: data.rows.item(i).Status_Id,
            Status: data.rows.item(i).Status,
            CreatedOn: data.rows.item(i).CreatedOn
          });
        }
        return orders;
      }, err => {
        console.log(err);
        return null;
      })
  }

  getOrderById(id) {
    return this.database.executeSql("SELECT O.*, OS.Status FROM Orders as O, OrderStatus as OS WHERE O.Status_Id==OS.Id AND O.Id=?", [id])
      .then(data => {
        let orders = [];
        for (var i = 0; i < data.rows.length; i++) {
          orders.push({
            Id: data.rows.item(i).Id,
            OrderDate: data.rows.item(i).OrderDate,
            CustomerId: data.rows.item(i).Customer_Id,
            StatusId: data.rows.item(i).Status_Id,
            Status: data.rows.item(i).Status,
            CreatedOn: data.rows.item(i).CreatedOn
          });
        }
        return orders;
      }, err => {
        console.log(err);
        return null;
      })
  }

  updateOrderStatus(status_id, id) {
    return this.database.executeSql("UPDATE Orders SET Status_Id=? WHERE Id=?", [status_id, id])
      .then(data => {
        return data;
      }, err => {
        console.log(err);
        return null;
      });
  }

  //#endregion

  //#region Status Manipulation

  getStatus() {
    return this.database.executeSql("SELECT * FROM OrderStatus", [])
      .then(data => {
        let status = [];
        for (var i = 0; i < data.rows.length; i++) {
          status.push({
            Id: data.rows.item(i).Id,
            Status: data.rows.item(i).Status,
            CreatedOn: data.rows.item(i).CreatedOn
          });
        }
        return status;
      },
      err => {
        console.log(err);
        return null;
      });
  }
  //#endregion

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
