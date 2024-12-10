import React from "react";
import NavLink from "./nav-link";
import { motion } from "motion/react";
import Button from "./Button";
import { MenuIcon } from "lucide-react";

const Sidebar = ({ links }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ width: 56 }}
      animate={{ width: isOpen ? 230 : 73 }}
      transition={{ duration: 0.5 }}
      className="min-h-[88vh] ml-3 mt-3 relative justify-between overflow-hidden  "
    >
      <motion.div
        initial={{ width: 73 }}
        animate={{ width: isOpen ? 200 : 73 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col justify-between h-5/6 py-5 fixed rounded-md bg-gradient-to-b  from-Primary-dark-Green to-green-600 ${
          isOpen ? "w-[185px]" : "w-[64px]"
        }`}
      >
        <div className="space-y-4 ">
          {links.map((link) => (
            <NavLink key={link.path} isOpen={isOpen} {...link} />
          ))}
        </div>
        <Button
          bgColor="bg-transparent"
          textColor="text-white"
          startIcon={MenuIcon}
          values={{ onClick: () => setIsOpen(!isOpen) }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
