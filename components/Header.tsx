import React, { ReactElement, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

interface Props {}

function Header({}: Props): ReactElement {
  const user = useUser();

  const links = [
    { name: "Test Bank", link: "testBank" },
    { name: "New Test", link: "newTest" },
    { name: "yourTests", link: "yourTests" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 shadow-lg ">
      <header className="sticky top-0 px-10 py-5  md:flex md:items-start md:justify-between max-w-7xl mx-auto z-20 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-row items-center justify-between md:shadow-xl 0"
        >
          <h3>Instant Test</h3>
          <div
            className="text-3xl cursor-pointer md:hidden block"
            onClick={() => setOpen(!open)}
          >
            {open ? <GrClose /> : <FiMenu />}
          </div>
        </motion.div>

        <div
          className={`md:flex md:items-center z[-1] md:z-auto md:static absolute w-full w-auto ${
            open
              ? "top-20 opacity-100"
              : "top-[-490px] opacity-0 md:opacity-100"
          }`}
        >
          <div className="md:flex md:flex-row md:items-center md:mx-3 ">
            {links.map((item) => (
              <Link href={`${item.link}`} key={Math.random()}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="md:mx-4  items-center cursor-pointer text-black border-gray-400 rounded-full shadow-xl px-3 hover:font-bold hover:text-lg"
                >
                  {`${item.name}`}
                </motion.div>
              </Link>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-row items-center cursor-pointer text-black border-gray-400 rounded-full shadow-xl px-3 hover:font-bold hover:text-lg"
          >
            {` ${user?.user_metadata.firstName}`}
          </motion.div>
        </div>
      </header>
    </div>
  );
}

export default Header;
