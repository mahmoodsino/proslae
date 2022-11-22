import { atom } from "recoil";
import QueryFiltersType from "../../types/QyeryFilterType"

const FiltersQueryAtom = atom<QueryFiltersType>({
    key: "FiltersQueryAtom",
    default: {
      SelectedBrands: [],
      SelectedCategories: [],
      page: 1,
      search: "",
      promotion:0
    },
  });

  export default FiltersQueryAtom