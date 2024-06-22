### 1. Consultas sobre una tabla

1. Devuelve un listado con todos los pedidos que se han realizado. Los pedidos deben estar ordenados por la fecha de realización, mostrando en primer lugar los pedidos más recientes.

   ```sql
   SELECT * FROM pedido ORDER BY fecha DESC;
   ```

2. Devuelve todos los datos de los dos pedidos de mayor valor.

   ```sql
   SELECT * FROM pedido ORDER BY total DESC LIMIT 2;
   ```

3. Devuelve un listado con los identificadores de los clientes que han realizado algún pedido. Tenga en cuenta que no debe mostrar identificadores que estén repetidos.

   ```sql
   SELECT DISTINCT id_cliente FROM pedido;
   ```

4. Devuelve un listado de todos los pedidos que se realizaron durante el año 2017, cuya cantidad total sea superior a 500€.

   ```sql
   SELECT * FROM pedido WHERE YEAR(fecha) = 2017 AND total > 500;
   ```

5. Devuelve un listado con el nombre y los apellidos de los comerciales que tienen una comisión entre 0.05 y 0.11.

   ```sql
   SELECT CONCAT(nombre,' ',apellido1,' ',apellido2) AS apellido FROM comercial WHERE comision BETWEEN 0.05 AND 0.11;
   ```

6. Devuelve el valor de la comisión de mayor valor que existe en la tabla `comercial`.

   ```sql
   SELECT MAX(comision) AS maxima_comision FROM comercial;
   ```

7. Devuelve el identificador, nombre y primer apellido de aquellos clientes cuyo segundo apellido **no** es `NULL`. El listado deberá estar ordenado alfabéticamente por apellidos y nombre.

   ```sql
   SELECT id, CONCAT(nombre,' ', apellido1) AS nombre_completo FROM cliente WHERE apellido2 IS NOT NULL ORDER BY nombre;
   ```

8. Devuelve un listado de los nombres de los clientes que empiezan por `A` y terminan por `n` y también los nombres que empiezan por `P`. El listado deberá estar ordenado alfabéticamente.

   ```sql
   SELECT nombre FROM cliente WHERE nombre LIKE '%n' AND nombre LIKE 'a%' OR nombre LIKE 'p%' ORDER BY nombre;
   ```

9. Devuelve un listado de los nombres de los clientes que **no** empiezan por `A`. El listado deberá estar ordenado alfabéticamente.

   ```sql
   SELECT nombre FROM cliente WHERE nombre NOT LIKE 'a%' ORDER BY nombre;
   ```

10. Devuelve un listado con los nombres de los comerciales que terminan por `el` o `o`. Tenga en cuenta que se deberán eliminar los nombres repetidos.

    ```sql
    SELECT DISTINCT nombre FROM comercial WHERE nombre LIKE '%el' OR nombre LIKE '%o';
    ```

    

### 2. Consultas multitabla (Composición interna)

Resuelva todas las consultas utilizando la sintaxis de `SQL1` y `SQL2`.

1. Devuelve un listado con el identificador, nombre y los apellidos de todos los clientes que han realizado algún pedido. El listado debe estar ordenado alfabéticamente y se deben eliminar los elementos repetidos.

   ```sql
   SELECT DISTINCT c.id, c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM cliente c LEFT JOIN pedido p ON c.id = p.id_cliente WHERE p.id_cliente IS NOT NULL GROUP BY c.id ORDER BY nombre;
   ```

2. Devuelve un listado que muestre todos los pedidos que ha realizado cada cliente. El resultado debe mostrar todos los datos de los pedidos y del cliente. El listado debe mostrar los datos de los clientes ordenados alfabéticamente.

   ```sql
   SELECT  c.id, c.nombre, c.apellido1, c.apellido2, c.ciudad, c.categoria, p.id, p.total, p.fecha, p.id_cliente, p.id_comercial FROM cliente c
   INNER JOIN pedido p on c.id = p.id_cliente
   ORDER BY c.nombre; 
   ```

3. Devuelve un listado que muestre todos los pedidos en los que ha participado un comercial. El resultado debe mostrar todos los datos de los pedidos y de los comerciales. El listado debe mostrar los datos de los comerciales ordenados alfabéticamente.

   ```sql
   SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision FROM pedido AS p INNER JOIN comercial AS cl ON cl.id = p.id_comercial ORDER BY nombre;
   ```

4. Devuelve un listado que muestre todos los clientes, con todos los pedidos que han realizado y con los datos de los comerciales asociados a cada pedido.

   ```sql
   SELECT c.id AS cliente_id, p.id AS pedido_id, co.id AS comercial_id, co.nombre, co.apellido1 FROM cliente AS c INNER JOIN pedido AS p ON c.id = p.id_cliente INNER JOIN comercial AS co ON p.id_comercial = co.id ORDER BY c.id;
   ```

5. Devuelve un listado de todos los clientes que realizaron un pedido durante el año `2017`, cuya cantidad esté entre `300` € y `1000` €.

   ```sql
   SELECT DISTINCT cliente.nombre, CONCAT(cliente.apellido1,' ',cliente.apellido2) AS apellido FROM cliente JOIN pedido ON cliente.id = pedido.id_cliente WHERE YEAR(pedido.fecha) = 2017 AND pedido.total BETWEEN 300 AND 1000;
   ```

6. Devuelve el nombre y los apellidos de todos los comerciales que ha participado en algún pedido realizado por `María Santana Moreno`.

   ```sql
   SELECT DISTINCT co.apellido1, co.nombre, co.apellido2
   FROM comercial co
   INNER JOIN pedido p ON p.id_comercial = co.id
   INNER JOIN cliente cl ON cl.id = p.id_cliente
   WHERE concat(cl.nombre, ' ',cl.apellido1, ' ',cl.apellido2) = 'Maria Santana Moreno';
   ```

7. Devuelve el nombre de todos los clientes que han realizado algún pedido con el comercial `Daniel Sáez Vega`.

   ```sql
   SELECT DISTINCT cliente.nombre FROM cliente INNER JOIN pedido ON cliente.id = pedido.id_cliente WHERE id_comercial = 1;
   ```

### 3. Consultas multitabla (Composición externa)

Resuelva todas las consultas utilizando las cláusulas `LEFT JOIN` y `RIGHT JOIN`.

1. Devuelve un listado con **todos los clientes** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los clientes que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los clientes.

   ```sql
   SELECT * FROM cliente LEFT JOIN pedido ON cliente.id=pedido.id_cliente ORDER BY cliente.nombre ASC;
   ```

2. Devuelve un listado con **todos los comerciales** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los comerciales que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los comerciales.

   ```sql
   SELECT co.id, CONCAT(co.apellido1, " " ,co.apellido2, " ", co.nombre) AS namefull, pe.total, pe.fecha, pe.id_cliente 
   FROM comercial co
   left JOIN pedido pe ON pe.id_comercial = co.id 
   ORDER BY namefull ASC;
   ```

3. Devuelve un listado que solamente muestre los clientes que no han realizado ningún pedido.

   ```sql
   SELECT * FROM cliente LEFT JOIN pedido ON cliente.id=pedido.id_cliente WHERE pedido.id_cliente IS NULL ORDER BY cliente.nombre ASC;
   ```

4. Devuelve un listado que solamente muestre los comerciales que no han realizado ningún pedido.

   ```sql
   SELECT DISTINCT c.id,c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM comercial c LEFT JOIN pedido p ON c.id=p.id_comercial WHERE p.id_comercial IS NULL GROUP BY c.id;
   ```

5. Devuelve un listado con los clientes que no han realizado ningún pedido y de los comerciales que no han participado en ningún pedido. Ordene el listado alfabéticamente por los apellidos y el nombre. En en listado deberá diferenciar de algún modo los clientes y los comerciales.

   ```sql
   SELECT c.id, c.nombre AS nombre, c.apellido1 AS apellido FROM cliente c 
   LEFT JOIN pedido p ON c.id = p.id_cliente WHERE p.id_cliente IS NULL 
   UNION ALL SELECT com.id, com.nombre AS nombre, com.apellido1 as apellido FROM comercial com 
   LEFT JOIN pedido p ON com.id = p.id_comercial WHERE p.id_comercial IS NULL;
   ```

### 4. Consultas resumen

1. Calcula la cantidad total que suman todos los pedidos que aparecen en la tabla `pedido`.

   ```sql
   SELECT SUM(total) AS sum_total FROM pedido;
   ```

2. Calcula la cantidad media de todos los pedidos que aparecen en la tabla `pedido`.

   ```sql
   SELECT AVG(total) AS avg_total FROM pedido;
   ```

3. Calcula el número total de comerciales distintos que aparecen en la tabla `pedido`.

   ```sql
   SELECT COUNT(DISTINCT id_comercial) AS 'totalComerciales' FROM pedido;
   ```

4. Calcula el número total de clientes que aparecen en la tabla `cliente`.

   ```sql
   SELECT COUNT(*) AS total_clientes FROM cliente;
   ```

5. Calcula cuál es la mayor cantidad que aparece en la tabla `pedido`.

   ```sql
   SELECT MAX(total) AS max_cantidad FROM pedido;
   ```

6. Calcula cuál es la menor cantidad que aparece en la tabla `pedido`.

   ```sql
   SELECT MIN(total) AS min_cantidad FROM pedido;
   ```

7. Calcula cuál es el valor máximo de categoría para cada una de las ciudades que aparece en la tabla `cliente`.

   ```sql
   SELECT DISTINC(ciudad), MAX(categoria) AS maximoCategoria FROM cliente GROUP BY ciudad;
   ```

8. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes. Es decir, el mismo cliente puede haber realizado varios pedidos de diferentes cantidades el mismo día. Se pide que se calcule cuál es el pedido de máximo valor para cada uno de los días en los que un cliente ha realizado un pedido. Muestra el identificador del cliente, nombre, apellidos, la fecha y el valor de la cantidad.

   ```SQL
   SELECT t1.id, t1.nombre,CONCAT(t1.apellido1,' ',t1.apellido2) AS apellido,MAX(t2.total) AS maximoValor,t2.fecha   FROM cliente t1, pedido t2 WHERE t2.id_cliente = t1.id GROUP BY t2.fecha, t1.id ORDER BY t1.nombre;
   ```

9. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes, teniendo en cuenta que sólo queremos mostrar aquellos pedidos que superen la cantidad de 2000 €.

   ```sql
      SELECT id_cliente, MAX(total) AS max_total, fecha FROM pedido GROUP BY id_cliente HAVING max_total > 2000;
   ```

10. Calcula el máximo valor de los pedidos realizados para cada uno de los comerciales durante la fecha `2016-08-17`. Muestra el identificador del comercial, nombre, apellidos y total.

    ```sql
    SELECT p.id 'id_pedido'
    , c.id 'id_comercial', concat(c.nombre ,'  ', c.apellido1) 'Comercial', max(p.total) 'Max Value' FROM comercial c INNER JOIN pedido p ON c.id= p.id_comercial WHERE fecha ='2016-08-17' GROUP BY p.id , c.nombre , c.apellido1;
    ```

11. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes. Tenga en cuenta que pueden existir clientes que no han realizado ningún pedido. Estos clientes también deben aparecer en el listado indicando que el número de pedidos realizados es `0`.

    ```sql
    SELECT cliente.id, cliente.nombre, CONCAT(cliente.apellido1,' ',cliente.apellido2) AS apellidos, COUNT(pedido.id) AS cantidadPedidos
    FROM cliente
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente
    GROUP BY cliente.id;
    ```

12. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes **durante el año 2017**.

    ```sql
    SELECT cliente.id, cliente.nombre, CONCAT(cliente.apellido1,' ',cliente.apellido2) AS apellidos, COUNT(pedido.id) AS cantidad2017 FROM cliente INNER JOIN pedido ON pedido.id_cliente = cliente.id WHERE year(pedido.fecha) = 2017 GROUP BY cliente.id;
    ```

13. Devuelve un listado que muestre el identificador de cliente, nombre, primer apellido y el valor de la máxima cantidad del pedido realizado por cada uno de los clientes. El resultado debe mostrar aquellos clientes que no han realizado ningún pedido indicando que la máxima cantidad de sus pedidos realizados es `0`. Puede hacer uso de la función [`IFNULL`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_ifnull).

    ```sql
    SELECT C.id, C.nombre, C.apellido1, IFNULL(max(P.total), 0) AS 'Cantidad maxima'
    FROM cliente AS C
    LEFT JOIN pedido as P
    ON C.id = P.id_cliente
    GROUP BY C.id;                  
    ```

14. Devuelve cuál ha sido el pedido de máximo valor que se ha realizado cada año.

    ```sql
        SELECT 
        pedidos.id,
        YEAR(pedidos.fecha) AS Año,
        pedidos.total AS 'Maximo Valor',
        pedidos.fecha AS 'Fecha Completa',
        pedidos.id_cliente AS 'ID Cliente',
        pedidos.id_comercial AS 'ID Comercial'
        FROM 
        pedido pedidos JOIN (
          SELECT
          YEAR(fecha) AS Año,
          max(total) AS Valor_Maximo
          FROM 
          pedido
          GROUP BY 
          año 
          ORDER BY 
          año) 
       AS max_ped_por_año 
       ON Año = max_ped_por_año.Año 
       AND pedidos.total = max_ped_por_año.Valor_Maximo;
        
    ```

15. Devuelve el número total de pedidos que se han realizado cada año.

    ```sql
    SELECT YEAR(fecha) AS año, COUNT(*) AS totalPedidos FROM pedido GROUP BY YEAR(fecha) ORDER BY año;
    ```

#### 5. Subconsultas con `IN` y `NOT IN`

1. Devuelve un listado de los clientes que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

   ```sql
   SELECT c.id, c.nombre, CONCAT(c.apellido1, ' ', c.apellido2) AS apellido
   FROM cliente AS c
   WHERE c.id NOT IN (SELECT p.id_cliente FROM pedido AS p);
   ```

2. Devuelve un listado de los comerciales que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

   ```sql
   SELECT c.id, c.nombre, CONCAT(c.apellido1, ' ', c.apellido2) AS apellido
   FROM comercial AS c
   WHERE c.id NOT IN (SELECT p.id_comercial FROM pedido AS p);
   ```

   

   