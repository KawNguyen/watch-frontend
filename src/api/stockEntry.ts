import makeApiRequest from "@/lib/call-api"; // Import makeApiRequest

export const stockEntry = {
  getAll: () => makeApiRequest("get", `/stock-entries`),

  getById: (id: string) => makeApiRequest("get", `/stock-entries/${id}`),

  create: (stockEntryData: {
    items: {
      watchId: string;
      quantity: number;
      price: number;
    }[];
    addedById: string;
  }) => makeApiRequest("post", `/stock-entries/create`, stockEntryData),
};
