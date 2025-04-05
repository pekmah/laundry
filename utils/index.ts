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
