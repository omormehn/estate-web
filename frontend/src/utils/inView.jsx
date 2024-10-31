import { useInView } from "framer-motion";
import React from "react";


const useInViewHook = (options) => {
  const ref = React.createRef();
  const inView = useInView(ref, options);

  return { ref, inView };
};

export default useInViewHook;
