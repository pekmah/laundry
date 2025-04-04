import { QueryClient, QueryKey } from "@tanstack/react-query";

// /**
//  * filters out an item of specific id from tanstack infinite query cache
//  * @param {number} id item id to be filtered out
//  * @param {Object} queryKeys cached query keys i.e. ['mtaani', 'pick-agent', 'agents', params?.agentId]
//  * @param {Object} queryClient react-query query client
//  */
// const filterOutItemFromInfiniteQueryCache = (
//   id: number,
//   queryKeys: QueryKey = [],
//   queryClient: QueryClient,
//   invalidationQueries = [] //[[queryKey, pageParam], [queryKey, pageParam]
// ) => {
//   queryClient.setQueryData(queryKeys, (prev) => {
//     return {
//       ...prev,
//       pages: prev?.map((page:any) => {
//         return {
//           ...page,
//           data: page.data.filter((pkg) => pkg.id !== id),
//         };
//       }),
//     };
//   });

export const updateQueryData = (
  queryKeys: QueryKey = [],
  queryClient: QueryClient,
  newData: any
) =>
  queryClient.setQueryData(queryKeys, (prev: any[]) => {
    if (!prev) return [newData];
    // check if newData already exists in the cache
    const exists = prev.find((item) => item.id === newData.id);

    if (exists) {
      return prev.map((item) => {
        if (item.id === newData.id) {
          return newData;
        }
        return item;
      });
    }

    return [newData, ...prev];
  });
