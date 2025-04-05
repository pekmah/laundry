// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any, otherMessage: string) => {
  const errorData = error?.response?.data;
  if (errorData?.message) {
    return otherMessage + errorData?.message;
  } else if (error?.message) {
    return otherMessage + error?.message;
  } else if (typeof error === "string") {
    return otherMessage + error;
  }
};

export const formatToKES = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  })
    .format(Math.abs(amount))
    .replace(/\s/g, ""); // Remove all spaces
};
