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

/* Consultas multitabla (Composición interna) */

// Devuelve un listado que muestre todos los pedidos en los que ha participado un comercial. El resultado debe mostrar todos los datos de los pedidos y de los comerciales. El listado debe mostrar los datos de los comerciales ordenados alfabéticamente.

export const getAllRequestWithCommercial = async() => {
    let [result] = await connection.query(
    `SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision FROM pedido AS p 
    INNER JOIN comercial AS cl ON cl.id = p.id_comercial 
    ORDER BY nombre;
    `);
    return result;
}

/* Consultas resumen */

// Calcula la cantidad total que suman todos los pedidos que aparecen en la tabla `pedido`.

export const getTotalSumRequest = async() => {
    let [result] = await connection.query(
    `SELECT SUM(total) AS sum_total FROM pedido;
    `);
    return result;
}

// Calcula la cantidad media de todos los pedidos que aparecen en la tabla `pedido`.

export const getAverageRequest = async() => {
    let [result] = await connection.query(
    `SELECT AVG(total) AS avg_total FROM pedido;
    `);
    return result;
}

// Calcula el número total de comerciales distintos que aparecen en la tabla `pedido`.

export const getTotalCommercial = async() => {
    let [result] = await connection.query(
    `SELECT COUNT(DISTINCT id_comercial) AS 'totalComerciales' FROM pedido;;
    `);
    return result;
}

// Calcula cuál es la mayor cantidad que aparece en la tabla `pedido`.

export const getMaxValueRequest = async() => {
    let [result] = await connection.query(
    `SELECT MAX(total) AS max_total FROM pedido;
    `);
    return result;
}

// Calcula cuál es la menor cantidad que aparece en la tabla `pedido`.

export const getMinValueRequest = async() => {
    let [result] = await connection.query(
    `SELECT MIN(total) AS min_total FROM pedido;
    `);
    return result;
}

// Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes, teniendo en cuenta que sólo queremos mostrar aquellos pedidos que superen la cantidad de 2000 €.

export const getMaxValueRequestInSameDaySuperiorTo2000 = async() => {
    let [result] = await connection.query(
    `SELECT id_cliente, MAX(total) AS max_total, fecha FROM pedido GROUP BY id_cliente HAVING max_total > 2000;
    `);
    return result;
}

// Devuelve cuál ha sido el pedido de máximo valor que se ha realizado cada año.

export const getMaxValueRequestByYear = async() => {
    let [result] = await connection.query(
    `SELECT pedidos.id, YEAR(pedidos.fecha) AS Año, pedidos.total AS 'Maximo Valor',
    pedidos.fecha AS 'Fecha Completa', pedidos.id_cliente AS 'ID Cliente',
    pedidos.id_comercial AS 'ID Comercial' FROM pedido pedidos 
    JOIN (SELECT YEAR(fecha) AS Año, max(total) AS Valor_Maximo FROM pedido
    GROUP BY año 
    ORDER BY año) 
    AS max_ped_por_año ON Año = max_ped_por_año.Año 
    AND pedidos.total = max_ped_por_año.Valor_Maximo;
    `);
    return result;
}

// Devuelve el número total de pedidos que se han realizado cada año.

export const getTotalRequestByYear = async() => {
    let [result] = await connection.query(
    `SELECT YEAR(fecha) AS año, COUNT(*) AS totalPedidos FROM pedido GROUP BY YEAR(fecha) ORDER BY año;
    `);
    return result;
}