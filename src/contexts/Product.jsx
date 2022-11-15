import { createContext, useState } from "react";

import useFuse from "../hooks/useFuse";
import {
  generateUUID,
  getObjFromLocalStorage,
  setObjToLocalStorage,
} from "../utils";

const INITIAL_PRODUCT_DATA = {
  products: [],
  addProduct: (newProduct) => {},
  sorting: {
    sortField: "price",
    sortDirection: 1,
  },
  setSortingData: (field, direction) => {},
  filterProducts: (term) => {},
  isFilterApplied: false,
};

export const ProductContext = createContext(INITIAL_PRODUCT_DATA);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(
    getObjFromLocalStorage("products") || [
      {
        category: "Organic",
        description: "Fruit",
        id: "1f924de2-e996-4a19-9dc8-893d1f98c3f6",
        image:
          "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg",
        name: "Apple",
        price: 12,
        ratings: 4,
      },
      {
        category: "Electronic",
        description: "Long lasting keyboard",
        id: "1f924de2-e996-4a19-9dc8-893d1fd8c3f6",
        image:
          "https://img.freepik.com/premium-vector/modern-grey-keyboard-minimalistic-keyboard-with-black-buttons-realistic-grey-color-computer-bluetooth-keyboard-white-background-vector-illustration_399089-3491.jpg?w=2000",
        name: "Keyboard",
        price: 340,
        ratings: 2,
      },
    ]
  );
  const [sorting, setSorting] = useState(INITIAL_PRODUCT_DATA.sorting);
  const [searchTerm, setSearchTerm] = useState("");

  const { result } = useFuse(products, searchTerm, {
    includeScore: false,
    // Search in `name` and `category`
    keys: ["name", "category"],
    threshold: 0.2,
  });

  const filterdProducts = searchTerm ? result.map((r) => r.item) : products;
  const isFilterApplied = !!searchTerm;

  const addProduct = (newProduct) => {
    setProducts((currentProducts) => {
      const updatedProducts = [
        ...currentProducts,
        {
          id: generateUUID(),
          ...newProduct,
        },
      ];

      setObjToLocalStorage("products", updatedProducts);

      return updatedProducts;
    });
  };

  const setSortingData = (field, direction) => {
    setSorting({
      sortField: field,
      sortDirection: direction,
    });
  };

  const filterProducts = (term) => {
    setSearchTerm(term);
  };

  return (
    <ProductContext.Provider
      value={{
        products: filterdProducts,
        addProduct,
        sorting,
        setSortingData,
        filterProducts,
        isFilterApplied,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
