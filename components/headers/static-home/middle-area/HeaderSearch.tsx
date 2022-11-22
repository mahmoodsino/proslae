import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { Search } from 'tabler-icons-react';
import { CategoriesAtom } from "../../../../helpers/recoil";
import SearchAtom from "../../../../helpers/recoil/home/SearchAtom";
import QueryFiltersAtom from "../../../../helpers/recoil/products/FiltersQueryAtom";


const HeaderSearch = () => {
  const [search, setSearch] = useRecoilState(SearchAtom)
  const [categories, setCategories] = useRecoilState(CategoriesAtom);
  const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
  const {push}=useRouter()


  const handleSearch = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryFilter(prev => {
      return(
        {...prev,search:search}
      )
    })
    push({
      query:{search:search},
      pathname:"/products"
    })};



const handleSelectCategory = (e:any) => {
    setQueryFilter(prev => {
			return(
			  {...prev,SelectedCategories:[e.target.value]}
			)
		  })
		  push({
			pathname: '/products',
			query: { category:e.target.value},
		});
};



  return (
    <div className="header-search-2">
      <form onSubmit={handleSearch}>
        <select
          name="category"
          className="truncate_"
          onChange={handleSelectCategory}
        >
          <option value="" disabled selected>
            All Categories
          </option>
          {React.Children.toArray(
            categories.map((category) => {
              return <option value={category.id} onClick={() => console.log(category)}>{category.name}</option>;
            })
          )}
        </select>
        <input
          type="text"
          placeholder="Search for Products"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-icon">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearch;
