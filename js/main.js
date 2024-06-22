import { 
    getAllRequestOrderedByDate,
    get2MaxValueRequest,
    getAllClientRequest,
    getAllRequestIn2017WhereTotalSuperior500,
    getAllRequestWithCommercial,
    getTotalSumRequest,
    getAverageRequest,
    getTotalCommercial,
    getMaxValueRequest,
    getMinValueRequest,
    getMaxValueRequestInSameDaySuperiorTo2000,
    getMaxValueRequestByYear,
    getTotalRequestByYear
} from "./module/pedido.js";

import { 
    getAllClientsWithoutSecondLastName,
    getAllClientsWhoStartAOrPAndFinishN,
    getAllClientsWhoNotStartA,
    getAllClientIdFirstAndLastNameRequest,
    getAllRequestByClient,
    getAllRequestByClientAndCommercial,
    getAllRequestIn2017WhereTotalBetween300And1000,
    getAllClientsWhoHaveRequestWithCommercialDanielSaezVega,
    getAllClientsAndRequest,
    getAllClientsWhoNotHaveRequest,
    getAllClientsAndCommercialWhoNotHaveRequest,
    getTotalClients,
    getMaxCategoryByCity,
    getMaxRequestByDay,
    getTotalRequestByClient,
    getTotalRequestByClientIn2017,
    getMaxRequestByClient,
    getAllClientsWhoNotHaveRequestUsingNotIn
} from "./module/cliente.js";

import { 
    getAllCommercialBetween005And011,
    getMaxValueCommercial,
    getAllCommercialWhoFinishElOrO,
    getAllCommercialWhoParticipateMariaSantanaMoreno,
    getAllCommercialAndRequest,
    getAllCommercialWhoNotRequest,
    getMaxValueRequestByCommercialDay08Month17In2016,
    getAllCommercialWhoNotHaveRequestUsingNotIn
} from "./module/comercial.js";

console.log(await getAll());