import React from "react";
import Modal from "react-responsive-modal";
import { useRecoilState } from "recoil";
import openBrandsDialogAtom from "../../helpers/recoil/sidebar/openBrandsDialogAtom";
import BrandsComponent from "../sidebars/brands/BrandsComponent";
import { X } from "tabler-icons-react";

const BrandsDialog = () => {
  const [openBrandDialog, setOpenBrandDialog] =
    useRecoilState(openBrandsDialogAtom);

  return (
    <div className="di">
        <div className={`${openBrandDialog && "modal22"} `}>
            <X onClick={() => setOpenBrandDialog(false)} className="closeModal"/>
          <BrandsComponent />
        </div>
    </div>
  );
};

export default BrandsDialog;
