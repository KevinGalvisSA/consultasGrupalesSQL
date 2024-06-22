import { connection } from "../../db/conection.js";

// Devuelve el identificador, nombre y primer apellido de aquellos clientes cuyo segundo apellido **no** es `NULL`. El listado deberá estar ordenado alfabéticamente por apellidos y nombre.

export const getAllClientsWithoutSecondLastName = async() => {
    let [result] = await connection.query(
    `SELECT id, CONCAT(nombre,' ', apellido1) AS nombre_completo FROM cliente 
    WHERE apellido2 IS NOT NULL ORDER BY nombre;
    `);
    return result;
}

// Devuelve un listado de los nombres de los clientes que empiezan por `A` y terminan por `n` y también los nombres que empiezan por `P`. El listado deberá estar ordenado alfabéticamente.

export const getAllClientsWhoStartAOrPAndFinishN = async() => {
    let [result] = await connection.query(
    `SELECT nombre FROM cliente 
    WHERE nombre LIKE '%n' AND nombre LIKE 'a%' OR nombre LIKE 'p%' 
    ORDER BY nombre;
    `);
    return result;
}

// Devuelve un listado de los nombres de los clientes que **no** empiezan por `A`. El listado deberá estar ordenado alfabéticamente.

export const getAllClientsWhoNotStartA = async() => {
    let [result] = await connection.query(
    `SELECT nombre FROM cliente 
    WHERE nombre NOT LIKE 'a%' 
    ORDER BY nombre;
    `);
    return result;
}
