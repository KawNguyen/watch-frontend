import { Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import emailjs from 'emailjs-com';

export default function MonochromeLuxuryContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject) newErrors.subject = 'Please select a subject';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const result = await emailjs.send(
                    'service_kai5al5',
                    'template_feepo1a',
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        phone: formData.phone,
                        message: formData.message
                    },
                    'hCS0IHarjxuWOm4BO'
                );

                toast({
                    title: "Success!",
                    description: "Your inquiry has been received. A specialist will be in touch shortly.",
                });

                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 5000);
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                });
            }
        }
    };

    return (
        <div className="border py-8 sm:px-8">
            <Toaster />
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-light text-black mb-4 tracking-widest font-serif">LuxWatch Inc</h1>
                    <div className="w-60 h-px bg-black mx-auto mb-6"></div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 px-8">
                    <div className="lg:w-1/3 h-full">
                        <div className="bg-gray-200 p-10 rounded-md border border-black relative">
                            <h2 className="text-2xl font-light text-black mb-10 uppercase tracking-widest">ABOUT US</h2>
                            <div className="mb-10">
                                <h3 className="text-lg font-normal text-black mb-4 uppercase tracking-wider flex items-center">
                                    <span className="w-4 h-px bg-black mr-8"></span>
                                    ADDRESS
                                </h3>
                                <div className='lg:px-12'>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.0774926902695!2d106.67146817451703!3d10.761562259468784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee24f6688c9%3A0x553d4225a89eb54b!2zOTMgxJAuIFRy4bqnbiBOaMOibiBUw7RuLCBQaMaw4budbmcgMiwgUXXhuq1uIDEwLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e1!3m2!1sen!2s!4v1744530475342!5m2!1sen!2s"
                                        width="300"
                                        height="150"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                            <div className="mb-10">
                                <h3 className="text-lg font-normal text-black mb-4 uppercase tracking-wider flex items-center">
                                    <span className="w-4 h-px bg-black mr-8"></span>
                                    HOURS
                                </h3>
                                <p className="text-black pl-12 tracking-wide">Monday - Friday: 10am - 6pm</p>
                                <p className="text-black pl-12 tracking-wide">Saturday: Contact</p>
                                <p className="text-black pl-12 tracking-wide">Sunday: Closed</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="text-lg font-normal text-black mb-4 uppercase tracking-wider flex items-center">
                                    <span className="w-4 h-px bg-black mr-8"></span>
                                    CONTACT
                                </h3>
                                <p className="text-black pl-12 tracking-wide">Telephone: +84 123 456 789</p>
                                <p className="text-black pl-12 tracking-wide">Email: contact@inc.com</p>

                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 h-full">
                        <div className="bg-gray-200 p-10 border rounded-md border-black relative">
                            <h2 className="text-2xl font-light text-black mb-4 uppercase tracking-widest">CONTACT</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-light text-black mb-2 uppercase tracking-widest">
                                            Name <span className="text-black">*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`${errors.name ? 'border-red-500' : 'border-black'} focus:outline-none rounded-md bg-white h-12 text-black placeholder-gray-600`}
                                        />
                                        {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-light text-black mb-2 uppercase tracking-widest">
                                            Email <span className="text-black">*</span>
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className={`${errors.email ? 'border-red-500' : 'border-black'} focus:outline-none rounded-md bg-white h-12 text-black placeholder-gray-600`}
                                        />
                                        {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-light text-black mb-2 uppercase tracking-widest">
                                            Telephone
                                        </label>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (212) 555-0000"
                                            className="w-full bg-white border-black focus:border-gray-700 focus:outline-none text-black h-12 placeholder-gray-600 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-light text-black mb-2 uppercase tracking-widest">
                                            Inquiry Type <span className="text-black">*</span>
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-white border-b-2 focus:outline-none appearance-none rounded-md ${errors.subject ? 'border-red-500' : 'border-black'} text-black`}
                                        >
                                            <option value="">Select inquiry type</option>
                                            <option value="collection">Private Collection</option>
                                            <option value="limited">Limited Edition</option>
                                            <option value="custom">Bespoke Timepieces</option>
                                            <option value="maintenance">Service & Maintenance</option>
                                            <option value="valuation">Valuation & Investment</option>
                                            <option value="other">Other Inquiry</option>
                                        </select>
                                        {errors.subject && <p className="mt-2 text-sm text-red-500">{errors.subject}</p>}
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <label htmlFor="message" className="block text-sm font-light text-black mb-2 uppercase tracking-widest">
                                        Message <span className="text-black">*</span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Please detail your inquiry..."
                                        className={`${errors.message ? 'border-red-500' : 'border-black'} focus:outline-none rounded-md bg-white text-black placeholder-gray-600`}
                                    />
                                    {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                                </div>
                                <div className="text-center">
                                    <Button
                                        type="submit"
                                        className="w-full px-8 py-3 border border-black rounded-md text-white "
                                    >
                                        SUBMIT
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
