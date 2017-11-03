CREATE TABLE IF NOT EXISTS Customer(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Gender TEXT, Age INTEGER, Address TEXT, Phone TEXT, DOB DATETIME, CreatedOn DATETIME);
CREATE TABLE IF NOT EXISTS Measurement_Value_Type(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, CreatedOn DATETIME);
CREATE TABLE IF NOT EXISTS Measurement_Type(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, CreatedOn DATETIME);
CREATE TABLE IF NOT EXISTS Measurement_Name(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Type_Id INTEGER, CreatedOn DATETIME);
CREATE TABLE IF NOT EXISTS OrderStatus(Id INTEGER PRIMARY KEY AUTOINCREMENT, Status TEXT, CreatedOn DATETIME);
CREATE TABLE IF NOT EXISTS Measurement(Id INTEGER PRIMARY KEY AUTOINCREMENT, Order_Id INTEGER, Name_Id INTEGER, Value_Type_Id INTEGER, Value DECIMAL(10,5), Sequence_No INTEGER, Qty INTEGER, CreatedOn DATETIME);
CREATE TABLE IF NOT EXISTS Orders(Id INTEGER PRIMARY KEY AUTOINCREMENT, OrderDate DATETIME, Customer_Id INTEGER, Status_Id INTEGER, CreatedOn DATETIME);

INSERT INTO Measurement_Value_Type(Name, CreatedOn) VALUES ('Inchs',CURRENT_TIMESTAMP);
INSERT INTO Measurement_Value_Type(Name, CreatedOn) VALUES ('CMs',CURRENT_TIMESTAMP);

INSERT INTO Measurement_Type(Name,CreatedOn) VALUES ('Shirt',CURRENT_TIMESTAMP);
INSERT INTO Measurement_Type(Name,CreatedOn) VALUES ('Pant',CURRENT_TIMESTAMP);

INSERT INTO OrderStatus(Status, CreatedOn) VALUES('Created', CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn) VALUES('Cutting Done', CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn) VALUES('Stitched', CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn) VALUES('Ironed', CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn) VALUES('Delivered', CURRENT_TIMESTAMP);

INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Neck', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Full Chest', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Shoulder', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Sleeve', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Bicep', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Cuff', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Stomach', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Hips', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Length', 1,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Chest Width', 1,CURRENT_TIMESTAMP);

INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Hips', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Seat', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Thigh', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Knee', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Cuff', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Outseam', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Inseam', 2,CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn) VALUES ('Crotch', 2,CURRENT_TIMESTAMP);