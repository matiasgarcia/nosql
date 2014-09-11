//-------
//Modelo:
//-------

create keyspace NoSql with replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

create table NoSql.Users (
	userName text primary key,
	password text
);

create table NoSql.UserHistory (
	userName text,
	accessTime timestamp,
	itemId uuid,
	itemName text,
	primary key(userName, accessTime)
);

create table NoSql.UserLikes (
	userName text,
	itemId uuid,
	itemName text,
	primary key(userName, itemId)
);

create table NoSql.Items (
	itemId uuid primary key,
	name text,
	price float,
	likers list<text>
);

create table NoSql.ItemCounters (
	itemId uuid primary key,
	visits counter,
	likes counter
);

//---------
//Acciones:
//---------

//Registrar un usuario:
insert into NoSql.Users(userName, password) values ('pedro', 'secreto');

//Registrar un item:
insert into NoSql.Items(itemId, name, price) values (96ade698-09c5-46f0-beb4-b842e5352bc8, 'cocacola', 10.5);

//Visitar un item:
insert into NoSql.UserHistory(userName, accessTime, itemId, itemName) values ('pedro', dateOf(now()), 96ade698-09c5-46f0-beb4-b842e5352bc8, 'cocacola');
update NoSql.ItemCounters set visits = visits + 1 where itemId = 96ade698-09c5-46f0-beb4-b842e5352bc8;

//Likear un item:
insert into NoSql.UserLikes(userName, itemId, itemName) values('pedro', 96ade698-09c5-46f0-beb4-b842e5352bc8, 'cocacola');
update NoSql.Items set likers = likers + ['pedro'] where itemId = 96ade698-09c5-46f0-beb4-b842e5352bc8;
update NoSql.ItemCounters set likes = likes + 1 where itemId = 96ade698-09c5-46f0-beb4-b842e5352bc8;

//----------
//Consultas:
//----------

//Datos de un usuario:
select * from NoSql.Users where userName = 'pedro';

//Datos de un item:
select * from NoSql.Items where itemId = 96ade698-09c5-46f0-beb4-b842e5352bc8;

//Items que le gustaron a un usuario:
select itemId, itemName from NoSql.UserLikes where userName = 'pedro';

//Usuarios a los que les gustó un item:
select likers from NoSql.Items where itemId = 96ade698-09c5-46f0-beb4-b842e5352bc8;

//Historial de navegación de un usuario:
select accessTime, itemId, itemName from NoSql.UserHistory where userName = 'pedro';

//Cantidad de visitas de cada item:
select visits from NoSql.ItemCounters;

//Cantidad de likes de cada item:
select likes from NoSql.ItemCounters;
