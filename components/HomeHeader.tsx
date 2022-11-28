import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

interface Props {}

function HomeHeader({}: Props): ReactElement {
  const user = useUser();
  const router = useRouter();

  return (
    <div className="bg-gray-100 shadow-lg ">
      <header className="sticky top-0 px-10 py-5  flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
        <motion.div
          initial={{
            // x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-row items-center shadow-xl 0"
        >
          <h3>Instant Test</h3>
        </motion.div>

        {!user ? (
          <div onClick={() => router.push("/login")}>
            <motion.div
              initial={{
                // x: 500,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-row items-center cursor-pointer text-black border-gray-400 rounded-full shadow-xl px-3 hover:font-bold hover:text-lg"
            >
              login
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{
              // x: 500,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-row items-center cursor-pointer text-black border-gray-400 rounded-full shadow-xl px-3 hover:font-bold hover:text-lg"
          >
            {`${user?.user_metadata.firstName}`}
          </motion.div>
        )}
      </header>
    </div>
  );
}

export default HomeHeader;
