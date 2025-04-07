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

export const formatToKES = (amount, replace = "") => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  })
    .format(Math.abs(amount))
    .replace(/\s/g, replace); // Remove all spaces
};

/**
 * Checks if the page required (prev/next) is available.
 * @param {number} pageLimit - Pagination limit.
 * @param {number} totalNumberOfItems - Total number of items.
 * @param {number} pageNumber - Current page number.
 * @param {"next" | "prev"} pageRequired - Page check needed, i.e., next/prev.
 * @returns {number | null} - The next or previous page number, or null if not available.
 */
export function getNextPrevPage(
  pageLimit: number,
  totalNumberOfItems: number,
  pageNumber: number,
  pageRequired: "next" | "prev"
): number | null {
  const currentPage = pageNumber;

  // Calculate total number of pages available
  const totalPagesAvailable = Math.ceil(totalNumberOfItems / pageLimit);

  if (pageRequired === "next") {
    // Check if the current page is not equal to the total pages available
    if (currentPage < totalPagesAvailable && currentPage >= 0) {
      return currentPage + 1;
    } else {
      if (currentPage === totalPagesAvailable) {
        return currentPage;
      }
      return null;
    }
  }

  if (pageRequired === "prev") {
    // Ensure the current page is not the first page
    if (currentPage > 1) {
      return currentPage - 1;
    } else {
      return currentPage;
    }
  }

  return null;
}

/**
 * Flattens paginated data from @tanstack/react-query's useInfiniteQuery.
 * @param pages - The pages array from the useInfiniteQuery result.
 * @param key - Optional key to extract nested data from each page.
 * @returns A flattened array of items.
 */
export const flattenInfiniteQueryData = <T>(
  pages: any[],
  key?: string
): T[] => {
  const result: T[] = [];
  if (pages?.length > 0) {
    for (const page of pages) {
      if (key && page?.[key]) {
        result.push(...page[key]);
      } else {
        result.push(...page);
      }
    }
  }
  return result;
};
