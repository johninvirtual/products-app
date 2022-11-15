import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

import useProduct from "../hooks/useProduct";
import { generateOptionsFromList } from "../utils";

const defaultFormValues = {
  name: "",
  image: "",
  description: "",
  price: 0,
  category: null,
  ratings: 0,
};

const categories = ["Organic", "Electronic", "Others"];
const categorySelectItems = generateOptionsFromList(categories);

export default function AddProductDialog({ visible, onHide }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: defaultFormValues });

  const { addProduct } = useProduct();

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = (data) => {
    addProduct(data);
    reset(defaultFormValues);
    onHide();
  };

  const closeDialog = () => {
    reset(defaultFormValues);
    onHide();
  };

  return (
    <Dialog
      header="Add Product"
      visible={visible}
      onHide={closeDialog}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
      draggable={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <label
            htmlFor="name"
            className={classNames("block", { "p-error": errors.name })}
          >
            Name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />

          {getFormErrorMessage("name")}
        </div>

        <div className="field">
          <label
            htmlFor="image"
            className={classNames("block", { "p-error": errors.image })}
          >
            Image URL
          </label>{" "}
          <Controller
            name="image"
            control={control}
            rules={{
              required: "Image URL is required.",
              pattern: {
                value:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
                message: "Provide a valid url",
              },
            }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />
          {getFormErrorMessage("image")}
        </div>

        <div className="field">
          <label
            htmlFor="description"
            className={classNames("block", { "p-error": errors.description })}
          >
            Description
          </label>
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required.",
            }}
            render={({ field, fieldState }) => (
              <InputTextarea
                id={field.name}
                {...field}
                maxLength={255}
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />

          {getFormErrorMessage("description")}
        </div>

        <div className="field">
          <label
            htmlFor="price"
            className={classNames("block", { "p-error": errors.price })}
          >
            Price
          </label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required.",
              min: { value: 1, message: "Price should be higher than zero" },
            }}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                name={field.name}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                mode="currency"
                currency="INR"
                min={0}
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />

          {getFormErrorMessage("price")}
        </div>

        <div className="field">
          <label
            htmlFor="category"
            className={classNames("block", { "p-error": errors.category })}
          >
            Category
          </label>
          <Controller
            name="category"
            control={control}
            rules={{
              required: "Category is required.",
            }}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                {...field}
                options={categorySelectItems}
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />

          {getFormErrorMessage("category")}
        </div>

        <div className="field">
          <label
            htmlFor="ratings"
            className={classNames("block", { "p-error": errors.ratings })}
          >
            Ratings (max 5)
          </label>
          <Controller
            name="ratings"
            control={control}
            rules={{
              required: "Ratings is required.",
            }}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                name={field.name}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                mode="decimal"
                min={0}
                max={5}
                minFractionDigits={0}
                maxFractionDigits={2}
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />

          {getFormErrorMessage("ratings")}
        </div>
        <Button type="submit" label="Submit" className="mt-2" />
      </form>
    </Dialog>
  );
}
