import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import Tabs from "../../home/sections/Taps";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

interface Props {
  open: boolean;
  setOpen: any;
  categories: any;
  brands: any;
}
const tabs = ["Categories", "Brands"];

const CategoryModal = ({ open, setOpen, brands, categories }: Props) => {
  const [currentIndex, setIndex] = useState(1);
  const handleTab = (index: number) => {
    setIndex(index);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div  className="">
          <div className="filter_category_body">
            <ul  className="tab__s">
              {tabs.map((tab, i) => {
                return (
                  <li
                    key={i}
                    className={i + 1 === currentIndex ? "tab selected_tab" : "tab"}
                    onClick={() => handleTab(i + 1)}
                  >
                    {tab}
                  </li>
                );
              })}
            </ul>
            <div>
              {currentIndex === 1 ? (
                <div style={{
                    maxHeight: "70vh",
                    minWidth: "250px",
                    overflowY: "auto",
                  }}>

                    {categories}
                </div>
              ) : (
                <div className="flex__">
                  <div
                    style={{
                      maxHeight: "70vh",
                      minWidth: "250px",
                      overflowY: "auto",
                    }}
                  >
                    {brands}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryModal;
