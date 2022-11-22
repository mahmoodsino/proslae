import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';


const fadeVariants = {
  hidden: {
    x: 0,
    y: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

interface Props {
  children?:ReactNode
  isShow?:boolean,
  className?:String
}


const FadeMotion = ({ children, isShow, className }:Props) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          key={3}
          initial="hidden"
          exit="hidden"
          animate="visible"
          variants={fadeVariants}
          // className={className ? className : ""}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeMotion;
