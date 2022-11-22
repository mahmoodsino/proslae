import React from 'react'
import { useRecoilState } from 'recoil'
import { X } from 'tabler-icons-react'
import openCategoriesDialogAtom from '../../helpers/recoil/sidebar/openCategoriesDialogAtom'
import Categories from "../../components/sidebars/categories/Categories"
import { CategoriesBaseComponent } from '../sidebars/categories'
const CategoriesDialog = () => {
  const [openCategoriesDialog,setOepnCategoriesDialog]=useRecoilState(openCategoriesDialogAtom)

  return (
    <div className="di">
    <div className={`${openCategoriesDialog && "modal22"} `}>
        <X onClick={() => setOepnCategoriesDialog(false)} className="closeModal"/>
      <CategoriesBaseComponent />
    </div>
</div>
  )
}

export default CategoriesDialog
