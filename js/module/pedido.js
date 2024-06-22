import { connection } from "../../db/conection.js";

// Devuelve un listado con todos los pedidos que se han realizado. Los pedidos deben estar ordenados por la fecha de realización, mostrando en primer lugar los pedidos más recientes.

export const getAllRequestOrderedByDate = async() => {
    let [result] = await connection.query(
    `SELECT * FROM pedido ORDER BY fecha DESC;
    `);
    return result;
}

// Devuelve todos los datos de los dos pedidos de mayor valor:

export const get2MaxValueRequest = async() => {
    let [result] = await connection.query(
    `SELECT * FROM pedido ORDER BY total DESC LIMIT 2;
    `);
    return result;
}

// Devuelve un listado con los identificadores de los clientes que han realizado algún pedido. Tenga en cuenta que no debe mostrar identificadores que estén repetidos.

export const getAllClientRequest = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT id_cliente FROM pedido;
    `);
    return result;
}

// Devuelve un listado de todos los pedidos que se realizaron durante el año 2017, cuya cantidad total sea superior a 500€.

export const getAllRequestIn2017WhereTotalSuperior500 = async() => {
    let [result] = await connection.query(
    `SELECT * FROM pedido WHERE YEAR(fecha) = 2017 AND total > 500;
    `);
    return result;
}