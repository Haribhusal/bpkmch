import React from "react";
import { useGetFormsQuery } from "../../services/forms";

const Forms = () => {
  const { data, isLoading, isError } = useGetFormsQuery();
  console.log(data);
  return <div>Forms</div>;
};

export default Forms;
