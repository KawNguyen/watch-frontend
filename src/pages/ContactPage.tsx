import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";

const ContactPage = () => {
  return (
    <main className="flex-grow">
      <AboutUs />
      <FAQ />
      <Contact />
    </main>
  );
};

export default ContactPage;
