db = db.getSiblingDB("GestionClub");
//Punto 1
//i. Obtener todos los documentos de la colección que contenga a los socios.
db.socios.find();

//ii. Obtener todos los documentos de forma organizada (pretty).
db.socios.find().pretty();

//iii. Obtener un array con los primeros 3 documentos de una colección.
db.socios.find().limit(3).toArray();

//iv. Obtener todos los apellidos y nombres de los socios que practican RUGBY.
db.socios.find( {deportes: "RUGBY"}, { nombre:1, apellido:1 });

//v. Obtener los documentos en un array los próximos 5 documentos, a partir del documento 5.
db.socios.find().skip(4).limit(5).toArray();

//vi. Obtener todos los documentos con todos sus atributos donde en las cuotas su vencimiento sea “01/02/2014”.
cuotasConfechaDeVencimiento = {'cuotas.fecha_vencimiento': ISODate("2014-02-01")};
db.socios.find(cuotasConfechaDeVencimiento);

//vii. Obtener el nro de socio, nombre, apellido, dni y deportes de todos los documentos con todos sus atributos donde las cuotas cuyo vencimiento sea “01/02/2014”.
db.socios.find(cuotasConfechaDeVencimiento,
	{
		nro_socio:1, 
		nombre:1, 
		apellido:1, 
		dni:1, 
		deportes:1, 
		_id:0
	});
//viii. Obtener los documentos de la colección que contenga los socios cuyo apellido comienza con ‘B’.
db.socios.find(
	{
		apellido: /^B/ 
	});
//ix. Obtener los datos en formato organizado (pretty) de los documentos cuyo nro de socio >3 y la fecha de emisión de la cuota sea mayor o igual a “01/01/2014”.
query = {
		nro_socio: {$gt: 3}, 
		'cuotas.fecha_emision': { $gte: ISODate("2014-01-01") } 
	};
	
db.socios.find(query).pretty();

//x. Idem consulta anterior, pero sólo mostrar los atributos apellido, nombre y dni.
db.socios.find(query, {nombre:1, apellido:1, dni:1, _id: 0}).pretty();

//xi. Idem consulta anterior, pero sólo informar la cantidad de documentos que cumplen con la condición.
db.socios.count(query);

//xii. Actualizar los documentos que cumplan con la condición del punto ix incorporando en los mismos un nuevo atributo “codigoInterno” con valor 1001.
db.socios.update(query, {$set: {codigoInterno: 1001}}, {multi:true});

//xiii. Obtener un listado de todos los documentos de la colección que contenga los datos de los socios que posean el atributo codigoInterno, formateados de manera organizada (pretty).
tieneElCampoCodigoInterno = {codigoInterno: {$exists:true}};
db.socios.find(tieneElCampoCodigoInterno).pretty();

//xiv. Obtener los documentos del punto anterior ordenados en forma descendente por apellido y por nombre.
db.socios.find(tieneElCampoCodigoInterno).sort({apellido:-1, nombre:-1});

/*xv. Armar un procedimiento en js que implemente un cursor para obtener la siguiente información:
Nro.: 9999999 Ape. y Nom.: XXXXXXXXXXXXX, XXXlXXXXXXXXX Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
														Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
														Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
														Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
Nro.: 9999999 Ape. y Nom.: XXXXXXXXXXXXX, XXXlXXXXXXXXX Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
														Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
														Nro Cuota: 99 Fecha Pago: dd/mm/yyyy
*/
function mostrarSocios(){
	var cursor = db.socios.find({'cuotas.fecha_pago': {$exists: true} }, {nro_socio:1, apellido:1, nombre:1, cuotas:1});
	while (cursor.hasNext()) {
		socio = cursor.next();
		print('Nro: '+socio.nro_socio+' Apellido y Nombre: '+socio.apellido+', '+socio.nombre);
		cuotas = socio.cuotas;
		if (cuotas){
			cuotas.forEach(function(cuota) {
			if(cuota.fecha_pago){
					print('Nro cuota: '+cuota.nro_cuota+' Fecha Pago: '+cuota.fecha_pago);					
				}
			});
		}
	}
}

mostrarSocios();
/*xvi. Actualice la/las agregando una nueva cuota para cada uno de los socios, con los siguientes datos:
Nro_cuota Fecha Emision Fecha Vencimiento Importe
10          01/09/2014      10/09/2014      410
*/
cuotaNueva = {nro_cuota:10, fecha_emision:ISODate("2014-09-01"), fecha_vencimiento:ISODate("2014-09-10"), importe: 410};
db.socios.update({}, {$push: {cuotas: cuotaNueva}}, {multi:true});

/*xvii. Insertar un nuevo socio que practicará dos deportes RUGBY y GOLF con los siguientes datos y con la cuota 10 con iguales valores del punto
anterior y Fecha de Pago “03/09/2014”. Los datos del socio son nro 155155, apellido Valotta, nombre Emiliano, dni 28333333 y dirección Conde 454 CABA.*/
cuotaNueva.fecha_pago = ISODate("2014-09-03");
db.socios.insert(
	{
		nro_socio: 155155, 
		apellido: 'Valotta', 
		nombre: 'Emiliano', 
		ni: 28333333, 
		direccion: 'Conde 454 - CABA', 
		cuotas: [cuotaNueva], 
		deportes: ["RUGBY", "GOLF"]
	});
//xviii. Eliminar el deporte RUGBY del socio con apellido “Valotta”.
db.socios.update({apellido:"Valotta"}, { $pull: { deportes: "RUGBY" }});

//xix. Agregar deporte GOLF a los socios con 112323 y 114536.
db.socios.update({nro_socio: { $in: [112323, 114536]} }, { $push: { deportes: "GOLF" }}, {multi:true});

//xx. Agregar los deportes GOLF y TENNIS a los socios con apellido “Malvasi”
db.socios.update({apellido: "Malvasi" }, { $pushAll: { deportes: ["GOLF","TENNIS"] }}, {multi:true});
