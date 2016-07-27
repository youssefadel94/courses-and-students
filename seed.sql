Create table Students
(
   
    Id int primary key NOT NULL  identity,
    Name nvarchar(50) ,
    Gender nvarchar(10) check ( Gender in ( 'MALE', 'FEMALE' )),
    Age int,
    Year int,
    PRIMARY KEY (Id, Name)
)
Go

Create table Courses
(
   
    Id int primary key NOT NULL  identity,
    Name nvarchar(50) ,
    Code int,
    Level nvarchar(10) check ( Level in ( 'EASY', 'MEDIUM', 'HARD' )),
    PRIMARY KEY (Id, Name, Code)
)
Go

Create table Taking
(
   
    
    Student_Id int FOREIGN KEY REFERENCES Students(Id) ,
    Course_Id int FOREIGN KEY REFERENCES Courses(Id) ,
    PRIMARY KEY (Student_Id, Course_Id)
    
)
Go

Insert into Students values ('Ben', 'Male', 18, 1)
Insert into Students values ('Sara', 'Female', 18, 1)
Insert into Students values ('Mark', 'Male', 19, 2)
Insert into Students values ('Pam', 'Female', 20, 3)
Insert into Students values ('Todd', 'Male', 22, 4)
Go

Insert into Courses values ('math', 2A0, 'easy')
Insert into Courses values ('physics',2B1, 'medium')
Insert into Courses values ('chemistry',3C1, 'hard')
Go

Insert into Taking values (1, 1)
Insert into Taking values (1, 2)
Insert into Taking values (2, 1)
Insert into Taking values (3, 1)
Insert into Taking values (4, 3)
Go