import React from 'react'
import { useRecoilState } from 'recoil';
import { totalPagesAtom } from '../../helpers/recoil';
import QueryFiltersAtom from "../../helpers/recoil/products/FiltersQueryAtom";
import Pagination from "react-js-pagination";


interface Props {
    paginate: (num: number) => void;
  }

const Paginations = ({ paginate }: Props) => {
  const [totalPages, setTotalPages] = useRecoilState(totalPagesAtom);
  const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);


  return (
    <div className="pagnation">
      <Pagination
        innerClass=""
        itemClass="pagenation___li border"
        activeClass="active_page "
        itemClassFirst="border  "
        itemClassPrev="border "
        activePage={queryFilter.page}
        itemsCountPerPage={25}
        totalItemsCount={25 * totalPages}
        pageRangeDisplayed={5}
        onChange={paginate.bind(this)}
      />
    </div>
  )
}

export default Paginations
