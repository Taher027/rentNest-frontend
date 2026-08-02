import React from "react";
import AddProperty from "./AddProperty";
import { getAllCategories } from "../_Actions/GetCategory";

const AddProperties = async () => {
  const category = await getAllCategories();
  return (
    <div className="p-5 md:p-10">
      <AddProperty category={category} />
    </div>
  );
};

export default AddProperties;
