
CREATE TABLE IF NOT EXISTS Customer (
	Id integer PRIMARY KEY AUTOINCREMENT,
	Name text,
	Gender text,
	Age integer,
	Address text,
	Phone text,
	DOB datetime,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS Measurement_Value_Type (
	Id integer PRIMARY KEY AUTOINCREMENT,
	Name text,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS  Measurement_Type (
	Id integer PRIMARY KEY AUTOINCREMENT,
	Name text,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS  Measurement_Name (
	Id integer PRIMARY KEY AUTOINCREMENT,
	Name text,
	Type_Id text,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS  OrderStatus (
	Id integer PRIMARY KEY AUTOINCREMENT,
	Status text,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS  Measurement (
	Id integer PRIMARY KEY AUTOINCREMENT,
	OrderType_Id integer,
	Name_Id integer,
	Value_Type_Id integer,
	Value decimal,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS  Orders (
	Id integer PRIMARY KEY AUTOINCREMENT,
	OrderDate datetime,
	Customer_Id integer,
	Status_Id integer,
	DueDate datetime,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS  OrderType (
	Id integer PRIMARY KEY AUTOINCREMENT,
	Order_Id integer,
	Type_Id integer,
	Sequence_No integer,
	Qty integer,
	Amount decimal,
	DueDate datetime,
	CreatedOn datetime,
	UpdatedOn datetime
);



INSERT INTO Measurement_Value_Type(Name, CreatedOn, UpdatedOn) VALUES ('Inchs',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Value_Type(Name, CreatedOn, UpdatedOn) VALUES ('CMs',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Measurement_Type(Name, CreatedOn, UpdatedOn) VALUES ('Shirt',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Type(Name, CreatedOn, UpdatedOn) VALUES ('Pant',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Created', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Cutting Done', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Stitched', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Ironed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Delivered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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