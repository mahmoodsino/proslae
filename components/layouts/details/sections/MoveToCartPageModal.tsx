import React from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useRouter } from "next/router";
import { ShoppingCart, ShoppingCartPlus } from "tabler-icons-react";

interface Props {
  open: boolean;
  setOpen: any;
}

const MoveToCartPageModal = ({ open, setOpen }: Props) => {
  const { push } = useRouter();
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={{marginTop:"15px"}}>
        <span style={{ display: "block", fontWeight: "600" }}>
          You have added new item to the cart!!
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            className="button_Modal_cancel"
          >
            continue shoping
          </button>

          <button className="button_Modal_cart" onClick={() => push("/cart")}>
            <ShoppingCart size="17" />
            Go to cart
          </button>
        </div>

        </div>
      </Modal>
    </div>
  );
};

export default MoveToCartPageModal;
