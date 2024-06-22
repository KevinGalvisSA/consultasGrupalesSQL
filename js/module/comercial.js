import { connection } from "../../db/conection.js";

// Devuelve un listado con el nombre y los apellidos de los comerciales que tienen una comisión entre 0.05 y 0.11.

export const getAllCommercialBetween005And011 = async() => {
    let [result] = await connection.query(
    `SELECT CONCAT(nombre,' ',apellido1,' ',apellido2) AS apellido 
    FROM comercial WHERE comision BETWEEN 0.05 AND 0.11;
    `);
    return result;
}

// Devuelve el valor de la comisión de mayor valor que existe en la tabla `comercial`.

export const getMaxValueCommercial = async() => {
    let [result] = await connection.query(
    `SELECT MAX(comision) AS maxima_comision FROM comercial;
    `);
    return result;
}

// Devuelve un listado con los nombres de los comerciales que terminan por `el` o `o`. Tenga en cuenta que se deberán eliminar los nombres repetidos.

export const getAllCommercialWhoFinishElOrO = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT nombre FROM comercial WHERE nombre LIKE '%el%' OR nombre LIKE '%o%';
    `);
    return result;
}

/* Consultas multitabla */

// Devuelve el nombre y los apellidos de todos los comerciales que ha participado en algún pedido realizado por `María Santana Moreno`.

export const getAllCommercialWhoParticipateMariaSantanaMoreno = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT co.apellido1, co.nombre, co.apellido2 FROM comercial co
    INNER JOIN pedido p ON p.id_comercial = co.id
    INNER JOIN cliente cl ON cl.id = p.id_cliente
    WHERE concat(cl.nombre, ' ',cl.apellido1, ' ',cl.apellido2) = 'Maria Santana Moreno';
    `);
    return result;
}

/* Consultas multitabla (Composición externa) */

// Devuelve un listado con **todos los comerciales** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los comerciales que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los comerciales.

export const getAllCommercialAndRequest = async() => {
    let [result] = await connection.query(
    `co.id, CONCAT(co.apellido1, " " ,co.apellido2, " ", co.nombre) AS namefull, pe.total, pe.fecha, pe.id_cliente 
    FROM comercial co
    left JOIN pedido pe ON pe.id_comercial = co.id 
    ORDER BY namefull ASC;
    `);
    return result;
}

// Devuelve un listado que solamente muestre los comerciales que no han realizado ningún pedido.

export const getAllCommercialWhoNotRequest = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT com.id, com.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM comercial com 
    LEFT JOIN pedido p ON c.id=p.id_comercial WHERE p.id_comercial IS NULL
    GROUP BY c.id;
    `);
    return result;
}

/* Consultas resumen */

// Calcula el máximo valor de los pedidos realizados para cada uno de los comerciales durante la fecha `2016-08-17`. Muestra el identificador del comercial, nombre, apellidos y total.

export const getMaxValueRequestByCommercialDay08Month17In2016 = async() => {
    let [result] = await connection.query(
    `SELECT p.id 'id_pedido', c.id 'id_comercial', concat(c.nombre ,'  ', c.apellido1) 'Comercial', max(p.total) 'Max Value' FROM comercial c 
    INNER JOIN pedido p ON c.id= p.id_comercial WHERE fecha ='2016-08-17' 
    GROUP BY p.id , c.nombre , c.apellido1;
    `);
    return result;
}

/* Subconsultas con 'IN' y 'NOT IN' */

// Devuelve un listado de los comerciales que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

export const getAllCommercialWhoNotHaveRequestUsingNotIn = async() => {
    let [result] = await connection.query(
    `SELECT c.id, c.nombre, CONCAT(c.apellido1, ' ', c.apellido2) AS apellido
    FROM comercial AS c
    WHERE c.id NOT IN (SELECT p.id_comercial FROM pedido AS p);
    `);
    return result;
}