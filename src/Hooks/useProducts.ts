import API_ENDPOINTS from "@/Api/apiEndpoints";
import { createCrudHooks } from "./createCrudHooks";

export const productHooks = createCrudHooks(
	API_ENDPOINTS.PRODUCTS.BASE,
	"products"
);
