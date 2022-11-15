import { useContext } from "react";
import { ProductContext } from "../contexts/Product";

export default function useProduct() {
  return useContext(ProductContext);
}
