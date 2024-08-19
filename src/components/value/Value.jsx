import React from "react";
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

const Value = () => {
  return (
    <section className="container my-28">
      <div className="section-align items-center">
        {/* Left side */}
        <div>
          <div className="leading-10">
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
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-start">
         
            
            <span>Value we give to you</span>
            <span>
              We always ready to help by providijng the best services for you.{" "}
              <br />
              We believe a good place to live can make your life better
            </span>
       
          {/* Accordion */}
          <Accordion
            allowMultipleExpanded={false}
            preExpanded={[0]}
            allowZeroExpanded={true}
            className="my-4"
          >
            {data.map((item, index) => {
              return (
                <AccordionItem className="" key={index} uuid={index}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="accordion-button">
                      <div className="flexCenter icon">{item.icon}</div>
                      <span className="">{item.heading}</span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20}/>
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Value