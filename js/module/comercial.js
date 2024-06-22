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