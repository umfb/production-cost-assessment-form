export interface Count {
  "Material/Ingredient": string;
  "Purchase Cost/QTY": string;
  Quantity: string;
  "Total Cost": string;
}

export interface Product {
  "Product Name": string;
  "Number of Qty Produced": string;
  Count: Count[];
}

export interface WAGM {
  "Cost/Unit": string;
  "Selling Price": string;
  "Product Margin": string;
  "Qty Sold Per Month": string;
  "Total Monthly Cost": string;
  WAGM: string;
}

export interface FormVal {
  "Client Name": string;
  Product: Product[];
  WAGM: WAGM[];
}
