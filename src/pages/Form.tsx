import FormHeader from "../components/FormHeader";
import NavBar from "../components/NavBar";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/FormSchema";
import MiniHeader from "../components/MiniHeader";
import CountFields from "../components/CountFields";
import { FormVal } from "../models/FormData.type";
import { useState } from "react";
import { submit } from "../utils/submit";
import { ToastContainer } from "react-toastify";

export default function Form() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormVal>({
    defaultValues: {
      Product: [
        {
          "Product Name": "",
          "Number of Qty Produced": "",
          Count: [
            {
              "Material/Ingredient": "",
              "Purchase Cost/QTY": "",
              Quantity: "",
              "Total Cost": "",
            },
          ],
        },
      ],
      WAGM: [
        {
          "Cost/Unit": "",
          "Selling Price": "",
          "Product Margin": "",
          "Qty Sold Per Month": "",
          "Total Monthly Cost": "",
          WAGM: "",
        },
      ],
    },
    resolver: zodResolver(FormSchema),
  });

  const {
    fields: productField,
    append: addProduct,
    remove: removeProduct,
  } = useFieldArray<FormVal>({
    control,
    name: "Product",
  });

  const {
    fields: wFields,
    append: addW,
    remove: removeW,
  } = useFieldArray<FormVal>({
    control,
    name: "WAGM",
  });

  const onSubmit = (data: FormVal) => {
    console.log(data);

    submit(data, setIsLoading, reset);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="border mx-auto md:p-5 py-5 overflow-auto h-screen relative">
      <div className="fixed top-0 left-0 text-center h-[150px] bg-white z-10 w-full shadow-md">
        <NavBar />
      </div>
      <div className="h-fit pb-10 lg:w-[70%] w-full mx-auto mt-[150px] border-1 border-[#800] md:px-8 px-2 rounded-lg">
        <FormHeader title="PRODUCTION COST ASSESSMENT" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mx-auto md:px-3 mt-3 inter"
        >
          <div className="row">
            <div className="wrapper-custom">
              <label htmlFor="client-name" className="label-custom">
                Client Name
              </label>
              <input
                {...register("Client Name")}
                type="text"
                id="client-name"
                name="Client Name"
                placeholder="Client Name"
                className="input-custom"
              />
              {errors["Client Name"] && (
                <p className="error-message">{errors["Client Name"].message}</p>
              )}
            </div>
          </div>
          {productField.map((product, productIndex) => (
            <div className="flex flex-col gap-3" key={product.id}>
              <div className="my-2">
                <MiniHeader title={`PRODUCT ${productIndex + 1}`} />
              </div>
              <div className="row">
                <div className="wrapper-custom col-12 col-lg-6">
                  <label
                    htmlFor={`product-${productIndex + 1}`}
                    className="label-custom"
                  >
                    Product
                  </label>
                  <input
                    {...register(`Product.${productIndex}.Product Name`)}
                    type="text"
                    id={`product-${productIndex + 1}`}
                    name={`Product.${productIndex}.Product Name`}
                    placeholder="Product Name"
                    className="input-custom"
                  />
                  {errors["Product"] &&
                    errors["Product"][productIndex] &&
                    errors["Product"][productIndex]["Product Name"] && (
                      <p className="error-message">
                        {
                          errors["Product"][productIndex]["Product Name"]
                            .message
                        }
                      </p>
                    )}
                </div>
                <div className="wrapper-custom col-12 col-lg-6">
                  <label
                    htmlFor={`no-of-qty-produced-${productIndex + 1}`}
                    className="label-custom"
                  >
                    Number of Qty produced
                  </label>
                  <input
                    {...register(
                      `Product.${productIndex}.Number of Qty Produced`
                    )}
                    type="text"
                    id={`no-of-qty-produced-${productIndex + 1}`}
                    name={`Product.${productIndex}.Number of Qty Produced`}
                    placeholder="Number of Qty Produced"
                    className="input-custom"
                  />
                </div>
              </div>
              <button
                className="disabled:bg-red-300 disabled:cursor-not-allowed bg-red-500 text-white py-1 px-3 w-fit active:scale-105"
                disabled={productIndex < 1}
                onClick={() => removeProduct(productIndex)}
                type="button"
              >
                Remove Product
              </button>
              <CountFields
                control={control}
                register={register}
                productIndex={productIndex}
                errors={errors}
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-3 py-1 active:scale-105"
              onClick={() =>
                addProduct({
                  "Product Name": "",
                  "Number of Qty Produced": "",
                  Count: [
                    {
                      "Material/Ingredient": "",
                      "Purchase Cost/QTY": "",
                      Quantity: "",
                      "Total Cost": "",
                    },
                  ],
                })
              }
              type="button"
            >
              Add Product
            </button>
          </div>
          {wFields.map((field, fieldIndex) => (
            <div key={field.id} className="flex flex-col gap-3">
              <div className="my-2">
                <MiniHeader
                  title={`WEIGHTED AVERAGE GROSS MARGIN ${fieldIndex + 1}`}
                />
              </div>
              <div className="row">
                <div className="wrapper-custom col-12 col-lg-4">
                  <label
                    htmlFor={`cost-unit-${fieldIndex + 1}`}
                    className="label-custom"
                  >
                    Cost/Unit
                  </label>
                  <input
                    {...register(`WAGM.${fieldIndex}.Cost/Unit`)}
                    type="text"
                    id={`cost-unit-${fieldIndex + 1}`}
                    name={`WAGM.${fieldIndex}.Cost/Unit`}
                    placeholder="Cost/Unit"
                    className="input-custom"
                  />
                  {errors?.WAGM?.[fieldIndex]?.["Cost/Unit"] && (
                    <p className="error-message">
                      {errors.WAGM[fieldIndex]["Cost/Unit"].message}
                    </p>
                  )}
                </div>
                <div className="wrapper-custom col-12 col-lg-4">
                  <label
                    htmlFor={`selling-price-${fieldIndex + 1}`}
                    className="label-custom"
                  >
                    Selling Price
                  </label>
                  <input
                    {...register(`WAGM.${fieldIndex}.Selling Price`)}
                    type="text"
                    id={`selling-price-${fieldIndex + 1}`}
                    name={`WAGM.${fieldIndex}.Selling Price`}
                    placeholder="Selling Price"
                    className="input-custom"
                  />
                  {errors?.WAGM?.[fieldIndex]?.["Selling Price"] && (
                    <p className="error-message">
                      {errors.WAGM[fieldIndex]["Selling Price"].message}
                    </p>
                  )}
                </div>
                <div className="wrapper-custom col-12 col-lg-4">
                  <label
                    htmlFor={`product-margin-${fieldIndex + 1}`}
                    className="label-custom"
                  >
                    Product Margin
                  </label>
                  <input
                    {...register(`WAGM.${fieldIndex}.Product Margin`)}
                    type="text"
                    id={`product-margin-${fieldIndex + 1}`}
                    name={`WAGM.${fieldIndex}.Product Margin`}
                    placeholder="Product Margin"
                    className="input-custom"
                  />
                  {errors?.WAGM?.[fieldIndex]?.["Product Margin"] && (
                    <p className="error-message">
                      {errors.WAGM[fieldIndex]["Product Margin"].message}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="wrapper-custom col-12 col-lg-4">
                  <label
                    htmlFor={`qty-sold-${fieldIndex + 1}`}
                    className="label-custom"
                  >
                    Qty Sold Per Month
                  </label>
                  <input
                    {...register(`WAGM.${fieldIndex}.Qty Sold Per Month`)}
                    type="text"
                    id={`qty-sold-${fieldIndex + 1}`}
                    name={`WAGM.${fieldIndex}.Qty Sold Per Month`}
                    placeholder="Qty Sold Per Month"
                    className="input-custom"
                  />
                  {errors?.WAGM?.[fieldIndex]?.["Qty Sold Per Month"] && (
                    <p className="error-message">
                      {errors.WAGM[fieldIndex]["Qty Sold Per Month"].message}
                    </p>
                  )}
                </div>
                <div className="wrapper-custom col-12 col-lg-4">
                  <label
                    htmlFor={`total-monthly-cost-${fieldIndex + 1}`}
                    className="label-custom"
                  >
                    Total Monthly Cost
                  </label>
                  <input
                    {...register(`WAGM.${fieldIndex}.Total Monthly Cost`)}
                    type="text"
                    id={`total-monthly-cost-${fieldIndex + 1}`}
                    name={`WAGM.${fieldIndex}.Total Monthly Cost`}
                    placeholder="Total Monthly Cost"
                    className="input-custom"
                  />
                  {errors?.WAGM?.[fieldIndex]?.["Total Monthly Cost"] && (
                    <p className="error-message">
                      {errors.WAGM[fieldIndex]["Total Monthly Cost"].message}
                    </p>
                  )}
                </div>
                <div className="wrapper-custom col-12 col-lg-4">
                  <label
                    htmlFor={`wagm-${fieldIndex + 1}`}
                    className="label-custom"
                  >
                    WAGM
                  </label>
                  <input
                    {...register(`WAGM.${fieldIndex}.WAGM`)}
                    type="text"
                    id={`wagm-${fieldIndex + 1}`}
                    name={`WAGM.${fieldIndex}.WAGM`}
                    placeholder="WAGM"
                    className="input-custom"
                  />
                  {errors?.WAGM?.[fieldIndex]?.["WAGM"] && (
                    <p className="error-message">
                      {errors.WAGM[fieldIndex]["WAGM"].message}
                    </p>
                  )}
                </div>
              </div>
              <button
                className="bg-red-500 py-1 px-3 text-white disabled:cursor-not-allowed disabled:bg-red-300 w-fit mt-2 active:scale-105"
                disabled={fieldIndex < 1}
                onClick={() => removeW(fieldIndex)}
                type="button"
              >
                Remove WAGM
              </button>
              <div
                className={`flex justify-end ${
                  fieldIndex === wFields.length - 1 ? "flex" : "hidden"
                }`}
              >
                <button
                  className="w-fit bg-green-500 px-3 py-1 text-white active:scale-105"
                  onClick={() =>
                    addW({
                      "Cost/Unit": "",
                      "Selling Price": "",
                      "Product Margin": "",
                      "Qty Sold Per Month": "",
                      "Total Monthly Cost": "",
                      WAGM: "",
                    })
                  }
                  type="button"
                >
                  Add WAGM
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#800] py-2 text-white rounded flex justify-center disabled:bg-red-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="border-t-[#800] border-2 h-6 w-6 animate-spin border-red-300 rounded-full"></div>
            ) : (
              <span className="text-xl">Submit Form</span>
            )}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
