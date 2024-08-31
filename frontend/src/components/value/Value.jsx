
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import data from "../../utils/accordion";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { motion } from "framer-motion";
import useInViewHook from "../../utils/inView";
import { FadeInFromLeft, FadeInFromRight, FadeInFromTop } from "../../utils/motion";

const Value = () => {
  const { ref, inView } = useInViewHook({threshold:0})

  return (
    <section className="">
      <div className="bg-section">
        <div ref={ref} className="container py-24 section-align items-center">
          {/* Left side */}
          <div>
            <motion.div
              variants={FadeInFromLeft(0.4)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="leading-10"
            >
              <div className="border-l-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold ml-4">
                  {""} Why Choose Us?
                </h1>
              </div>
              <br /> <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis laboriosam animi, quos, sequi exercitationem libero
                accusantium consequatur reiciendis tempore ab dolor, laudantium
                nam ex. Totam suscipit inventore perferendis aliquid possimus!
              </p>
            </motion.div>
          </div>

          {/* Right side */}
          <div ref={ref} className="flex flex-col justify-start">
            <motion.div
              variants={FadeInFromTop(0.5)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              <span>Value we give to you</span>
              <span>
                We always ready to help by providijng the best services for you.{" "}
                <br />
                We believe a good place to live can make your life better
              </span>
            </motion.div>

            {/* Accordion */}
            <motion.div
              variants={FadeInFromRight(0.7)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              <Accordion
                allowMultipleExpanded={false}
                preExpanded={[0]}
                allowZeroExpanded={true}
                className="my-4 border-none"
              >
                {data.map((item, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      uuid={index}
                      className="accordionItem"
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className="flex flex-1 items-center justify-between w-full p-4">
                          <div className=" icon">{item.icon}</div>
                          <span className="font-bold">{item.heading}</span>
                          <div className="icon">
                            <MdOutlineArrowDropDown size={20} />
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p className="font-light text-sm ">{item.detail}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Value