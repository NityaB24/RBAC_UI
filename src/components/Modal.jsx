import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-dark bg-opacity-80 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }} 
  >
    <motion.div
      className="bg-[#c5c3d5] p-7 rounded-lg shadow-lg relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }} 
      exit={{ scale: 0.8, opacity: 0 }}  
      transition={{ duration: 0.3 }} 
    >
      <motion.button
        className="text-black absolute top-1 right-1 p-1 bg-inherit hover:text-[#6961a2]"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        X
      </motion.button>

      {children}
    </motion.div>
  </motion.div>
);

export default Modal;
