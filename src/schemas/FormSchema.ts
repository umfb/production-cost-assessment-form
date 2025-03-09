import * as z from "zod";

export const FormSchema = z.object({
  "Client Name": z.string().nonempty("This field is required"),
  Product: z.array(
    z.object({
      "Product Name": z.string().nonempty("This field is required"),
      "Number of Qty Produced": z.string().nonempty("This field is required"),
      Count: z.array(
        z.object({
          Quantity: z.string().nonempty("This field is required"),
          "Material/Ingredient": z.string().nonempty("This field is required"),
          "Purchase Cost/QTY": z.string().nonempty("This field is required"),
          "Total Cost": z.string().nonempty("This field is required"),
        })
      ),
    })
  ),
  WAGM: z.array(
    z.object({
      "Cost/Unit": z.string().nonempty("This field is required"),
      "Selling Price": z.string().nonempty("This field is required"),
      "Product Margin": z.string().nonempty("This field is required"),
      "Qty Sold Per Month": z.string().nonempty("This field is required"),
      "Total Monthly Cost": z.string().nonempty("This field is required"),
      WAGM: z.string().nonempty("This field is required"),
    })
  ),
});

export type FormValues = z.infer<typeof FormSchema>;
