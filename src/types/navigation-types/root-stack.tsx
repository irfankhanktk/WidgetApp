import { Product } from "types/entities-types";

type RootStackParamList = {
  Splash: undefined;
  Regions: undefined;
  Organizations: {
    id: number
  }
  Products: {
    id: number
  },
  ProductDetails: {
    id: number
  },
  AddProduct: {
    organizationId?: number,
    product?: Product
  }

};
export default RootStackParamList;
