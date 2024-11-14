import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-transparent z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "keyframes", duration: 1 }}
    >
      <motion.div
        className="text-white text-3xl font-bold ml-4"
        whileHover={{
          scale: 1.1, // Zoom in effect
          transition: { duration: 0.3 }, // Smooth transition for scaling
        }}
      >
        <img
          src="/j3s-taskmanager-logo-transparent.png"
          className="w-full h-10"
        ></img>
      </motion.div>

      <ul className="flex space-x-10 mr-4">
        {["Home", "About", "Services", "Contact"].map((item, index) => (
          <li
            key={index}
            className="text-slate-100 font-custom text-lg hover:text-slate-300 transition-colors duration-300 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Navbar;
