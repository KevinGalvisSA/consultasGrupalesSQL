import { connection } from "../../db/conection.js";

/* Consultas de una sola tabla */

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

/* Consultas multitabla (Composición interna) */

// Devuelve un listado con el identificador, nombre y los apellidos de todos los clientes que han realizado algún pedido. El listado debe estar ordenado alfabéticamente y se deben eliminar los elementos repetidos.

export const getAllClientIdFirstAndLastNameRequest = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT c.id, c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM cliente c 
    LEFT JOIN pedido p ON c.id = p.id_cliente WHERE p.id_cliente IS NOT NULL 
    GROUP BY c.id ORDER BY nombre;
    `);
    return result;
}

// Devuelve un listado que muestre todos los pedidos que ha realizado cada cliente. El resultado debe mostrar todos los datos de los pedidos y del cliente. El listado debe mostrar los datos de los clientes ordenados alfabéticamente.

export const getAllRequestByClient = async() => {
    let [result] = await connection.query(
    `SELECT  c.id, c.nombre, c.apellido1, c.apellido2, c.ciudad, c.categoria, p.id, p.total, p.fecha, p.id_cliente, p.id_comercial FROM cliente c
    INNER JOIN pedido p on c.id = p.id_cliente
    ORDER BY c.nombre; 
    `);
    return result;
}

// Devuelve un listado que muestre todos los clientes, con todos los pedidos que han realizado y con los datos de los comerciales asociados a cada pedido.

export const getAllRequestByClientAndCommercial = async() => {
    let [result] = await connection.query(
    `SELECT CONCAT(c.nombre,' ',c.apellido1,' ',c.apellido2) as nombre_cliente, c.ciudad, c.categoria, p.id AS id_pedido, p.total, p.fecha, p.id_cliente, p.id_comercial, CONCAT(com.nombre,' ',com.apellido1,' ',com.apellido2) AS nombre_comercial FROM cliente c
    INNER JOIN pedido p on c.id = p.id_cliente
    INNER JOIN comercial com on p.id_comercial = com.id
    ORDER BY c.nombre; 
    `);
    return result;
}

// Devuelve un listado de todos los clientes que realizaron un pedido durante el año `2017`, cuya cantidad esté entre `300` € y `1000` €.

export const getAllRequestIn2017WhereTotalBetween300And1000 = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT cliente.nombre, CONCAT(cliente.apellido1,' ',cliente.apellido2) AS apellido FROM cliente 
    JOIN pedido ON cliente.id = pedido.id_cliente 
    WHERE YEAR(pedido.fecha) = 2017 AND pedido.total BETWEEN 300 AND 1000;
    `);
    return result;
}

// Devuelve el nombre de todos los clientes que han realizado algún pedido con el comercial `Daniel Sáez Vega`.

export const getAllClientsWhoHaveRequestWithCommercialDanielSaezVega = async() => {
    let [result] = await connection.query(
    `SELECT DISTINCT cliente.nombre FROM cliente INNER JOIN pedido ON cliente.id = pedido.id_cliente WHERE id_comercial = 1;
    `);
    return result;
}

/* Consultas multitaba (Composicion externa) */

// Devuelve un listado con **todos los clientes** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los clientes que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los clientes.

export const getAllClientsAndRequest = async() => {
    let [result] = await connection.query(`
    SELECT * FROM cliente 
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente 
    ORDER BY cliente.nombre ASC;
    `);
    return result;
}

// Devuelve un listado que solamente muestre los clientes que no han realizado ningún pedido:

export const getAllClientsWhoNotHaveRequest = async() => {
    let [result] = await connection.query(`
    SELECT * FROM cliente 
    LEFT JOIN pedido ON cliente.id = pedido.id_cliente 
    WHERE pedido.id_cliente IS NULL
    ORDER BY cliente.nombre ASC;;
    `);
    return result;
}

// Devuelve un listado con los clientes que no han realizado ningún pedido y de los comerciales que no han participado en ningún pedido. Ordene el listado alfabéticamente por los apellidos y el nombre. En en listado deberá diferenciar de algún modo los clientes y los comerciales.

export const getAllClientsAndCommercialWhoNotHaveRequest = async() => {
    let [result] = await connection.query(`
    SELECT * FROM cliente 
    LEFT JOIN pedido ON cliente.id = pedido.id_cliente 
    WHERE pedido.id_cliente IS NULL
    UNION
    SELECT * FROM comercial 
    LEFT JOIN pedido ON comercial.id = pedido.id_comercial 
    WHERE pedido.id_comercial IS NULL
    ORDER BY cliente.nombre ASC;;
    `);
    return result;
}

/* Consultas resumen */

// Calcula el número total de clientes que aparecen en la tabla `cliente`

export const getTotalClients = async() => {
    let [result] = await connection.query(`
    SELECT COUNT(*) AS total_clientes FROM cliente;
    `);
    return result;
}

// Calcula cuál es el valor máximo de categoría para cada una de las ciudades que aparece en la tabla `cliente`.

export const getMaxCategoryByCity = async() => {
    let [result] = await connection.query(`
    SELECT DISTINC(ciudad), MAX(categoria) AS maximoCategoria FROM cliente 
    GROUP BY ciudad;
    `);
    return result;
}

// Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes. Es decir, el mismo cliente puede haber realizado varios pedidos de diferentes cantidades el mismo día. Se pide que se calcule cuál es el pedido de máximo valor para cada uno de los días en los que un cliente ha realizado un pedido. Muestra el identificador del cliente, nombre, apellidos, la fecha y el valor de la cantidad.

export const getMaxRequestByDay = async() => {
    let [result] = await connection.query(`
    SELECT t1.id, t1.nombre, CONCAT(t1.apellido1,' ',t1.apellido2) AS apellido,MAX(t2.total) AS maximoValor, t2.fecha FROM cliente t1, pedido t2 
    WHERE t2.id_cliente = t1.id GROUP BY t2.fecha, t1.id 
    ORDER BY t1.nombre;
    `);
    return result;
}

// Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes. Tenga en cuenta que pueden existir clientes que no han realizado ningún pedido. Estos clientes también deben aparecer en el listado indicando que el número de pedidos realizados es `0`.

export const getTotalRequestByClient = async() => {
    let [result] = await connection.query(`
    SELECT cliente.id, cliente.nombre, CONCAT(cliente.apellido1,' ',cliente.apellido2) AS apellidos, COUNT(pedido.id) AS cantidadPedidos
    FROM cliente
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente
    GROUP BY cliente.id;
    `);
    return result;
}

// Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes **durante el año 2017**.

export const getTotalRequestByClientIn2017 = async() => {
    let [result] = await connection.query(`
    SELECT cliente.id, cliente.nombre, CONCAT(cliente.apellido1,' ',cliente.apellido2) AS apellidos, 
    COUNT(pedido.id) AS cantidad2017 FROM cliente 
    INNER JOIN pedido ON pedido.id_cliente = cliente.id 
    WHERE year(pedido.fecha) = 2017 
    GROUP BY cliente.id;
    `);
    return result;
}

// Devuelve un listado que muestre el identificador de cliente, nombre, primer apellido y el valor de la máxima cantidad del pedido realizado por cada uno de los clientes. El resultado debe mostrar aquellos clientes que no han realizado ningún pedido indicando que la máxima cantidad de sus pedidos realizados es `0`. Puede hacer uso de la función [`IFNULL`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_ifnull).

export const getMaxRequestByClient = async() => {
    let [result] = await connection.query(`
    SELECT C.id, C.nombre, C.apellido1, IFNULL(max(P.total), 0) AS 'Cantidad maxima'
    FROM cliente AS C
    LEFT JOIN pedido as P
    ON C.id = P.id_cliente
    GROUP BY C.id;  
    `);
    return result;
}

/* Subconsultas con 'IN' y 'NOT IN' */

// Devuelve un listado de los clientes que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

export const getAllClientsWhoNotHaveRequestUsingNotIn = async() => {
    let [result] = await connection.query(`
    SELECT c.id, c.nombre, CONCAT(c.apellido1, ' ', c.apellido2) AS apellido
    FROM cliente AS c
    WHERE c.id NOT IN (SELECT p.id_cliente FROM pedido AS p);
    `);
    return result;
}