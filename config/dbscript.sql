CREATE DATABASE customerRestaurant;

CREATE TABLE `maindish` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Price` double DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO maindish (Name, Price) VALUES ('Rice', 100);
INSERT INTO maindish (Name, Price) VALUES ('Rotty', 20);
INSERT INTO maindish (Name, Price) VALUES ('Noodles', 150);

CREATE TABLE `sidedish` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Price` double DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO sidedish (Name, Price) VALUES ('Wadai', 45);
INSERT INTO sidedish (Name, Price) VALUES ('Dhal Curry', 75);
INSERT INTO sidedish (Name, Price) VALUES ('Fish Curry', 120);

CREATE TABLE `desserts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Price` double DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO desserts (Name, Price) VALUES ('Watalappam', 40);
INSERT INTO desserts (Name, Price) VALUES ('Jelly', 20);
INSERT INTO desserts (Name, Price) VALUES ('Pudding', 25);



CREATE TABLE Orders (
    OrderID int NOT NULL auto_increment,
    OrderNumber int NOT NULL,
    MainDishID int,
    Total double,
    OrderDate datetime NOT NULL,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (MainDishID) REFERENCES maindish(ID)
);

CREATE TABLE SideDishDetails (
  OrderID INT NOT NULL,
  SideDishID INT NOT NULL,
  Quantity INT NOT NULL,
  PRIMARY KEY (OrderID, SideDishID),
  FOREIGN KEY (OrderID) REFERENCES orders(OrderID),
  FOREIGN KEY (SideDishID) REFERENCES sidedish(ID)
);

CREATE TABLE DessertsDetails (
  OrderID INT NOT NULL,
  DessertsID INT NOT NULL,
  Quantity INT NOT NULL,
  PRIMARY KEY (OrderID, DessertsID),
  FOREIGN KEY (OrderID) REFERENCES orders(OrderID),
  FOREIGN KEY (DessertsID) REFERENCES desserts(ID)
);