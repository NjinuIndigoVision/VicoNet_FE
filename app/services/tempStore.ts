var searchQuery = "";

export const setSearchQuery = (query: string) => {
  searchQuery = query;
};

export const getSearchQuery = () => {
  return searchQuery;
};
