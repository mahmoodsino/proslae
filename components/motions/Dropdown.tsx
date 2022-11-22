import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLockPage from "../../helpers/hooks/useLockPage";

const modalVariants = {
  hidden: {
    x: 0,
    y: -20,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface Props {
  children?:any,
  isShow?:any,
  className?:any,
  lockScroll?: any,
  hasOverlay?:any,
  handleClose?:any,
}

const ModalMotion = ({
  children,
  isShow,
  className,
  lockScroll: _lockScroll,
  hasOverlay = true,
  handleClose,
}:Props) => {
  const { lockScroll, unlockScroll } = useLockPage();

  useEffect(() => {
    if (_lockScroll) {
      isShow && lockScroll();
      !isShow && unlockScroll();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <AnimatePresence>
      {isShow && (
        <>
          <motion.div
            key={10}
            className={className}
            role="menu"
            exit="hidden"
            initial="hidden"
            animate="visible"
            variants={modalVariants}
          >
            {children}
          </motion.div>
          {hasOverlay && (
            <div
              className="opacity-40 fixed inset-0 z-20 bg-black"
              onClick={handleClose}
            ></div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalMotion;
