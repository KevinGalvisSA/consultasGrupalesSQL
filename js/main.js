import { 
    getAllRequestOrderedByDate,
    get2MaxValueRequest,
    getAllClientRequest,
    getAllRequestIn2017WhereTotalSuperior500,
} from "./module/pedido.js";

import { 
    getAllClientsWithoutSecondLastName,
    getAllClientsWhoStartAOrPAndFinishN,
    getAllClientsWhoNotStartA
} from "./module/cliente.js";

import { 
    getAllCommercialBetween005And011,
    getMaxValueCommercial,
    getAllCommercialWhoFinishElOrO
} from "./module/comercial.js";

console.log(await getAll());