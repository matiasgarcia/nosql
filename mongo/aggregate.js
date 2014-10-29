db = db.getSiblingDB("GestionClub");
//1) Realizar una consulta que devuelva la siguiente información: deporte y total de ingresos por deporte.
db.socios.aggregate([ 
	{ $unwind: "$deportes" }, 
	{ $unwind: "$cuotas" }, 
	{ $group: 
		{_id:"$deportes", 
		total: {$sum: "$cuotas.importe"}
	}}
]);

//3)Basado en la consulta del punto 1, mostrar sólo los deportes que tengan un ingreso superior a un determinado valor (elegimos $900)	.
db.socios.aggregate([ 
	{ $unwind: "$deportes" }, 
	{ $unwind: "$cuotas" }, 
	{ $group: 
		{_id:"$deportes", 
		total: {$sum: "$cuotas.importe"}
	}},
	{ $match: {total: {$gt: 900 }} }
]);

/*4)Se requiere obtener un reporte que contenga la siguiente información, nro de socio, apellido y nombre y cantidad de deportes que practica, 
ordenado por apellido.*/
db.socios.aggregate([ 
	{ $unwind: "$deportes" }, 
	{ $group: 
		{_id: {apellido:"$apellido", nombre:"$nombre"}, 
		count: {$sum: 1}
	}},
	{ $sort: {"_id.apellido": 1}}
]);

/*5)Basados en la consulta del punto 4 informar sólo los socios cuyo número de socio es mayor o igual a 120000 (en el caso de no mostrar resultados, 
poner un número acorde a los datos que poseen).*/
db.socios.aggregate([ 
	{ $match: {nro_socio: {$gt: 120000}}},
	{ $unwind: "$deportes" }, 
	{ $group: 
		{_id: {apellido:"$apellido", nombre:"$nombre"}, 
		count: {$sum: 1}
	}},
	{ $sort: {"_id.apellido": 1}}
]);

/*6)Basados en la consulta del punto 5 informar, informar sólamente la cantidad de socios que cumplen con esta condición.*/
db.socios.aggregate([ 
	{ $match: 
		{nro_socio: 
			{$gt: 120000}
		}
	},
	{ $group: 
		{_id: null,
		count: {$sum: 1}}
	}
]);

/*7)Se requiere realizar una consulta que devuelva la siguiente información: deporte y cantidad de socios que lo practican, 
ordenado en forma descendente por cantidad de socios.*/
db.socios.aggregate([
	{ $unwind: "$deportes" },
	{ $group: 
		{_id: "$deportes",
		count: {$sum: 1}}
	},
	{ $sort: 
		{count: -1}
	}
]);
