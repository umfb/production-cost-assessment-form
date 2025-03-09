import { useFieldArray } from "react-hook-form";
import { CountFieldsProps } from "../models/CountFieldProps.type";
import { FormVal } from "../models/FormData.type";

const CountFields: React.FC<CountFieldsProps> = ({
  control,
  register,
  productIndex,
  errors,
}) => {
  const {
    fields: countFields,
    append: addCount,
    remove: removeCount,
  } = useFieldArray<FormVal>({
    control,
    name: `Product.${productIndex}.Count`,
  });

  return (
    <div>
      {countFields.map((count, countIndex) => (
        <div className="flex flex-col gap-3" key={count.id}>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label
                htmlFor={`ingredient-qty-${countIndex + 1}`}
                className="label-custom"
              >
                Quantity
              </label>
              <input
                {...register(
                  `Product.${productIndex}.Count.${countIndex}.Quantity`
                )}
                type="text"
                id={`ingredient-qty-${countIndex + 1}`}
                name={`Product.${productIndex}.Count.${countIndex}.Quantity`}
                placeholder="Quantity"
                className="input-custom"
              />
              {errors?.Product?.[productIndex]?.Count?.[countIndex]
                ?.Quantity && (
                <p className="error-message">
                  {
                    errors.Product[productIndex].Count[countIndex].Quantity
                      .message
                  }
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label
                htmlFor={`material/ingredient-${countIndex + 1}`}
                className="label-custom"
              >
                Material/Ingredient
              </label>
              <input
                {...register(
                  `Product.${productIndex}.Count.${countIndex}.Material/Ingredient`
                )}
                type="text"
                id={`material/ingredient=${countIndex + 1}`}
                name={`Product.${productIndex}.Count.${countIndex}.Material/Ingredient`}
                placeholder="Material/Ingredient"
                className="input-custom"
              />
              {errors?.Product?.[productIndex]?.Count?.[countIndex]?.[
                "Material/Ingredient"
              ] && (
                <p className="error-message">
                  {
                    errors.Product[productIndex].Count[countIndex][
                      "Material/Ingredient"
                    ].message
                  }
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label
                htmlFor={`purchase-cost-${countIndex + 1}`}
                className="label-custom"
              >
                Purchase Cost/Quantity
              </label>
              <input
                {...register(
                  `Product.${productIndex}.Count.${countIndex}.Purchase Cost/QTY`
                )}
                type="text"
                id={`purchase-cost-${countIndex + 1}`}
                name={`Product.${productIndex}.Count.${countIndex}.Purchase Cost/QTY`}
                placeholder="Purchase Cost/QTY"
                className="input-custom"
              />
              {errors?.Product?.[productIndex]?.Count?.[countIndex]?.[
                "Purchase Cost/QTY"
              ] && (
                <p className="error-message">
                  {
                    errors.Product[productIndex].Count[countIndex][
                      "Purchase Cost/QTY"
                    ].message
                  }
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label
                htmlFor={`total-cost-${countIndex + 1}`}
                className="label-custom"
              >
                Total Cost
              </label>
              <input
                {...register(
                  `Product.${productIndex}.Count.${countIndex}.Total Cost`
                )}
                type="text"
                id={`total-cost=${countIndex + 1}`}
                name={`Product.${productIndex}.Count.${countIndex}.Total Cost`}
                placeholder="Total Cost"
                className="input-custom"
              />
              {errors?.Product?.[productIndex]?.Count?.[countIndex]?.[
                "Total Cost"
              ] && (
                <p className="error-message">
                  {
                    errors.Product[productIndex].Count[countIndex]["Total Cost"]
                      .message
                  }
                </p>
              )}
            </div>
          </div>
          <button
            disabled={countIndex < 1}
            type="button"
            onClick={() => removeCount(countIndex)}
            className="bg-red-500 text-white py-1 px-3 disabled:bg-red-300 disabled:cursor-not-allowed w-fit"
          >
            Remove Count
          </button>
          <div
            className={`flex justify-end border-b-2 pb-2 ${
              countIndex === countFields.length - 1 ? "flex" : "hidden"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                addCount({
                  "Material/Ingredient": "",
                  "Purchase Cost/QTY": "",
                  Quantity: "",
                  "Total Cost": "",
                })
              }
              className={`bg-green-500 text-white px-3 py-1 w-fit `}
            >
              Add Count
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountFields;
