import { useEffect,ReactNode } from "react";

import { motion, AnimatePresence } from "framer-motion";

import  useLockPage  from "../../helpers/hooks/useLockPage"
import { useRecoilState } from "recoil";
import CartMenuAtom from "../../helpers/recoil/home/CartMenuAtom";

export const Direction = {
  left: "left",
  right: "right",
};

Object.freeze(Direction);

const getVariants = (direction:any) => {
  return {
    hidden: {
      x: direction === Direction.left ? "-100%" : "100%",
      y: 0,
      transition: { bounce: 0, duration: 0.4 },
    },
    visible: {
      x: 0,
      y: 0,
      transition: { bounce: 0, duration: 0.4 },
    },
  };
};

interface Props {
  children?:ReactNode
  isShow?:boolean
  className?:string,
  isLockScroll ?:boolean,
  hasOverlay? :boolean
  direction ?:any
    handleClose:any

}

const SidebarMotion = ({
  children,
  isShow,
  className,
  isLockScroll = true,
  hasOverlay = true,
  direction = Direction.right,
  handleClose
}:Props) => {
  const { lockScroll, unlockScroll } = useLockPage();
  const [openCartMenu,setOpenCartMenu]=useRecoilState(CartMenuAtom)

  useEffect(() => {
    if (isLockScroll) {
      isShow && lockScroll();
      !isShow && unlockScroll();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <AnimatePresence>
      {isShow && (
        <>
          <motion.aside
            key={1}
            initial="hidden"
            exit="hidden"
            animate="visible"
            variants={getVariants(direction)}
            className={className}
          >
            {children}
          </motion.aside>
          {hasOverlay && <div className="overlay" onClick={handleClose}></div>}
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarMotion;
