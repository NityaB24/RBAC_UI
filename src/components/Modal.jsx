import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-dark bg-opacity-80 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="bg-[#c5c3d5] p-6 rounded-lg shadow-lg ">
      {children}
      <button className="text-secondary mt-4 ml-2" onClick={onClose}>
        Close
      </button>
    </div>
  </motion.div>
);

export default Modal;
