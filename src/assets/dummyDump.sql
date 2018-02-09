
CREATE TABLE IF NOT EXISTS Customer (
	Id integer PRIMARY KEY AUTOINCREMENT,
	UserId integer,
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

CREATE TABLE IF NOT EXISTS User (
	UserId integer PRIMARY KEY AUTOINCREMENT,
	Username text,
	Password text,
	Phone text,
	Email text,
	DOB datetime,
	Gender text,
	IsLogin boolean,
	QuestionId integer,
	Answer text,
	CreatedOn datetime,
	UpdatedOn datetime
);

CREATE TABLE IF NOT EXISTS SecurityQuestions (
	QuestionId integer PRIMARY KEY AUTOINCREMENT,
	Question text,
	CreatedOn datetime,
	UpdatedOn datetime
);



INSERT INTO Measurement_Value_Type(Name, CreatedOn, UpdatedOn) VALUES ('Inchs',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Value_Type(Name, CreatedOn, UpdatedOn) VALUES ('CMs',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Measurement_Type(Name, CreatedOn, UpdatedOn) VALUES ('Shirt',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Type(Name, CreatedOn, UpdatedOn) VALUES ('Pant',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('CreatedOn', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Cutting Done', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Stitched', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Ironed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO OrderStatus(Status, CreatedOn, UpdatedOn) VALUES('Delivered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Neck', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Full Chest', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Shoulder', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Sleeve', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Bicep', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Cuff', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Stomach', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Hips', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Length', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id, CreatedOn, UpdatedOn) VALUES ('Chest Width', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Hips', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Seat', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Thigh', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Knee', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Cuff', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Outseam', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Inseam', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Measurement_Name(Name, Type_Id,CreatedOn, UpdatedOn) VALUES ('Crotch', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What is your favorite color?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What is your favorite movie?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What is the name of your favorite pet?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('Who is your favorite actor, musician, or artist?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What is the name of your first school?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('When is your anniversary?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What was your favorite place to visit as a child?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What is your mother''s maiden name?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('What is your favorite food?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO SecurityQuestions(Question, CreatedOn, UpdatedOn) VALUES ('what is your favorite website', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);