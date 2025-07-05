
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI image transformation work?",
      answer: "Our AI uses advanced GPT Image 1 models to analyze your original image and generate a new version in the style you choose. The AI has been trained on thousands of examples to understand the visual characteristics of Ghibli art, action figures, and other styles, allowing it to apply these elements to your photos."
    },
    {
      question: "What image formats are supported?",
      answer: "We support most common image formats including JPEG, PNG, WebP, and HEIC. The maximum file size is 10MB per image. For best results, we recommend using clear, well-lit images with good resolution."
    },
    {
      question: "How long does the transformation process take?",
      answer: "Most transformations complete within 10-30 seconds, depending on server load and the complexity of the image. Business plan users receive priority processing for faster results."
    },
    {
      question: "Can I use the transformed images commercially?",
      answer: "Yes, with our Pro and Business plans, you receive commercial usage rights for all generated images. The Free plan is for personal use only."
    },
    {
      question: "Is my data secure and private?",
      answer: "We take privacy very seriously. Your uploaded images are processed securely and not used to train our AI models unless you explicitly opt in. All images are deleted from our servers after 24 hours unless you save them to your account."
    },
    {
      question: "Can I request a custom style that's not listed?",
      answer: "Business plan subscribers can request custom style development. Contact our support team to discuss your specific needs and we'll work with you to create a custom solution."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get answers to the most common questions about our service.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="#" className="text-ghibli-600 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
