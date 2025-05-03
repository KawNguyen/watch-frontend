import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div>
      <div className="container mx-auto mt-20 py-20 lg:py-4">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-5">
            <h1 className="w-full lg:w-[80%] text-5xl font-semibold lg:text-4xl lg:ml-2 ">
              Frequently Asked Question
            </h1>
            <div className="w-full mt-10 text-xl lg:w-[80%] lg:ml-2 ">
              Here's a list of frequently asked questions. You can also contact
              us if you have any questions.
            </div>
          </div>
          <div className=" col-span-11 mt-6 xl:col-span-7">
            <div className="w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How can I place an order?</AccordionTrigger>
                  <AccordionContent>
                    You can place an order directly on our website by adding the
                    item to your cart and filling in your shipping details.
                    We’ll contact you to confirm before shipping.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do you ship nationwide?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer nationwide shipping through trusted couriers
                    like Giao Hàng Nhanh and Viettel Post.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How long does delivery take?
                  </AccordionTrigger>
                  <AccordionContent>
                    Inner city areas: 1–2 business days
                  </AccordionContent>
                  <AccordionContent>
                    Other provinces: 3–5 business days
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Can I check the product before paying?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we support product inspection before payment (COD) in
                    most areas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Are your watches authentic?
                  </AccordionTrigger>
                  <AccordionContent>
                    We guarantee 100% authentic products. If you find any
                    counterfeit items, we will refund 10 times the value of your
                    order.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Can I return or exchange if I’m not satisfied?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can return or exchange the product within 7 days if
                    it is unused and in its original packaging.{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
