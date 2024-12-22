import React from "react";
import NavLink from "./nav-link";
import { motion } from "motion/react";
import Button from "./Button";
import { MenuIcon } from "lucide-react";

const Sidebar2 = ({ links,role="Doctor" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ width: 56 }}
      animate={{ width: isOpen ? 230 : 73 }}
      transition={{ duration: 0.5 }}
      className="relative justify-between overflow-hidden h-screen "
    >
      <motion.div
        initial={{ width: 73 }}
        animate={{ width: isOpen ? 200 : 73 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col justify-between h-[92%] py-5 fixed  bg-gradient-to-b  ${role=="Doctor"?"from-Primary-dark-blue to-blue-500":"from-teal-800   to-teal-500"} ${
          isOpen ? "w-[185px]" : "w-[64px]"
        }`}
      >
        <div className="space-y-4 ">
          {links.map((link) => (
            <NavLink key={link.path} isOpen={isOpen} {...link} color = {"bg-blue-200"}/>
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

export default Sidebar2;
