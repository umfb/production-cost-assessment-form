import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { FormVal } from "./FormData.type";

export interface CountFieldsProps {
  control: Control<FormVal>;
  register: UseFormRegister<FormVal>;
  productIndex: number;
  errors: FieldErrors<FormVal>;
}
