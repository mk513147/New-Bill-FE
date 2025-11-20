import API_ENDPOINTS from "@/Api/apiEndpoints";
import { createCrudHooks } from "./createCrudHooks";

export const supplierHooks = createCrudHooks(
	API_ENDPOINTS.SUPPLIERS.BASE,
	"suppliers"
);
