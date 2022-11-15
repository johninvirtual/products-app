import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import useProduct from "../hooks/useProduct";
import AddProductDialog from "./AddProductDialog";

// '!' in value mean descending order
const sortOptions = [
  { label: "Price High to Low", value: "!price" },
  { label: "Price Low to High", value: "price" },
  { label: "Rating", value: "!ratings" },
];

export default function ProductHeader() {
  const [sortKey, setSortKey] = useState(null);
  const [addDialogVisible, setAddDialogVisible] = useState(false);

  const { setSortingData, filterProducts } = useProduct();

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortKey(value);
      setSortingData(value.substring(1, value.length), -1);
    } else {
      setSortKey(value);
      setSortingData(value, 1);
    }
  };

  const openAddDialog = () => {
    setAddDialogVisible(true);
  };

  const closeAddDialog = () => {
    setAddDialogVisible(false);
  };

  return (
    <>
      <div className="grid grid-nogutter">
        <div className="col-12 md:col-6 flex flex-row align-items-center">
          <h2>Products</h2>

          <span className="p-input-icon-left ml-4">
            <i className="pi pi-search" />
            <InputText
              placeholder="Seach Products..."
              onChange={(e) => filterProducts(e.target.value)}
            />
          </span>
        </div>
        <div className="col-12 md:col-6 flex flex-row align-items-center justify-content-end">
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By"
            onChange={onSortChange}
          />
          <Button className="ml-4" label="Add" onClick={openAddDialog} />
        </div>
      </div>

      <AddProductDialog visible={addDialogVisible} onHide={closeAddDialog} />
    </>
  );
}
