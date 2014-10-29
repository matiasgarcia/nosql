db = db.getSiblingDB("GestionClub");
db.socios.insert({
	nro_socio: 112323,
	nombre: "Juan Cruz",
	apellido: "Biroccio",
	dni: 27787688,
	direccion: "Pje Bollini 778 - CABA",
	deportes: ["RUGBY"],
	cuotas: [
	{nro_cuota: 1, fecha_emision: ISODate("2014-01-01"), fecha_vencimiento: ISODate("2014-01-10"), importe: 325, fecha_pago: ISODate("2014-01-07")},
	{nro_cuota: 2, fecha_emision: ISODate("2014-02-01"), fecha_vencimiento: ISODate("2014-02-10"), importe: 325, fecha_pago: ISODate("2014-02-06")},
	{nro_cuota: 3, fecha_emision: ISODate("2014-03-01"), fecha_vencimiento: ISODate("2014-03-10"), importe: 325, fecha_pago: ISODate("2014-03-07")},
	{nro_cuota: 4, fecha_emision: ISODate("2014-04-01"), fecha_vencimiento: ISODate("2014-04-10"), importe: 358}
	]
});
db.socios.insert({
	nro_socio: 113245,
	nombre: "Martina",
	apellido: "Pardo",
	dni: 25787777,
	direccion: "J. Newbery 4633 - CABA",
	deportes: ["HOCKEY S/CESPED", "CESTO BALL"],
	cuotas: [
	{nro_cuota: 1, fecha_emision: ISODate("2014-01-01"), fecha_vencimiento: ISODate("2014-01-10"), importe: 325, fecha_pago: ISODate("2014-01-05")},
	{nro_cuota: 2, fecha_emision: ISODate("2014-02-01"), fecha_vencimiento: ISODate("2014-02-10"), importe: 325}
	]
});
db.socios.insert({
	nro_socio: 114536,
	nombre: "Miguel",
	apellido: "Suparo",
	dni: 23787399,
	direccion: "B. Mitre 987 9no A - CABA",
	deportes: ["RUGBY", "TENNIS"],
	cuotas: [
	{nro_cuota: 1, fecha_emision: ISODate("2014-01-01"), fecha_vencimiento: ISODate("2014-01-10"), importe: 275, fecha_pago: ISODate("2014-01-08")},
	{nro_cuota: 2, fecha_emision: ISODate("2014-02-01"), fecha_vencimiento: ISODate("2014-02-10"), importe: 275, fecha_pago: ISODate("2014-02-04")},
	{nro_cuota: 3, fecha_emision: ISODate("2014-03-01"), fecha_vencimiento: ISODate("2014-03-10"), importe: 275, fecha_pago: ISODate("2014-03-09")}
	]
});
db.socios.insert({
	nro_socio: 120778,
	nombre: "Soledad",
	apellido: "Malvasi",
	dni: 25373789,
	direccion: "Rojas 1123 11vo 10 - CABA",
	deportes: ["HOCKEY S/CESPED"],
	cuotas: [{nro_cuota: 1, fecha_emision: ISODate("2014-01-01"), fecha_vencimiento: ISODate("2014-01-10"), importe: 275}]
});
db.socios.insert({
	nro_socio: 121567,
	nombre: "Rodolfo",
	apellido: "Broggi",
	dni: 21667984,
	direccion: "J. B. Justo 6557 - CABA",
	deportes: ["RUGBY", "TENNIS"],
	cuotas: [
	{nro_cuota: 1, fecha_emision: ISODate("2014-01-01"), fecha_vencimiento: ISODate("2014-01-10"), importe: 325, fecha_pago: ISODate("2014-01-06")},
	{nro_cuota: 2, fecha_emision: ISODate("2014-02-01"), fecha_vencimiento: ISODate("2014-02-10"), importe: 325}
	]
});
