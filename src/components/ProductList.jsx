import { useState } from "react";
import { DataView } from "primereact/dataview";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import { Rating } from "primereact/rating";

import ProductHeader from "./ProductHeader";
import useProduct from "../hooks/useProduct";
import { generateOptionsFromList } from "../utils";

const quantityOptions = generateOptionsFromList([1, 2, 3, 4, 5]);

export default function ProductList() {
  const { products, sorting, isFilterApplied } = useProduct();

  const renderProduct = (product) => {
    const [quantity, setQuantity] = useState(1);

    const header = (
      <Image
        alt="Card"
        src={product.image}
        className="product-card-image"
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
      />
    );

    const title = (
      <div className="flex flex-row align-items-center justify-content-between">
        <span className="flex flex-row align-items-center">
          <span>{product.name}</span>{" "}
          <Button
            icon="pi pi-bookmark"
            className="p-button-sm p-button-rounded p-button-text p-button-primary ml-2"
            aria-label="Bookmark"
          />
        </span>
        <span>
          <Button
            icon="pi pi-pencil"
            className="p-button-sm p-button-rounded p-button-text p-button-secondary ml-1"
            aria-label="Edit"
          />
          <Button
            icon="pi pi-trash"
            className="p-button-sm p-button-rounded p-button-text p-button-danger ml-1"
            aria-label="Delete"
          />
        </span>
      </div>
    );

    const subTitle = (
      <span>
        <div>₹ {product.price}</div>
        <div>{product.category}</div>
      </span>
    );

    const footer = <div className="flex flex-row"></div>;

    return (
      <div className="col-12 md:col-4 lg:col-3 p-4">
        <Card title={title} subTitle={subTitle} header={header} footer={footer}>
          <Rating className="my-2" value={product.ratings} cancel={false} />
          <span>
            Qty:{" "}
            <Dropdown
              className="my-4"
              value={quantity}
              options={quantityOptions}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </span>
          <div className="flex flex-row gap-2">
            <Button label="Add to Cart" />
            <Button className="p-button-danger" label="Remove" />
          </div>
        </Card>
      </div>
    );
  };

  return (
    <DataView
      value={products}
      layout="grid"
      itemTemplate={renderProduct}
      header={<ProductHeader />}
      sortOrder={sorting.sortDirection}
      sortField={sorting.sortField}
      emptyMessage={
        isFilterApplied ? "No results found" : "Please add new product"
      }
    ></DataView>
  );
}
