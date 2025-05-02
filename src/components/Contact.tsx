import { useState, useRef } from 'react'
import { MapPinIcon, PhoneIcon, MailIcon, SendIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import emailjs from 'emailjs-com'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email_id: '',
        subject: '',
        message: '',
    })

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: false,
    })

    const formRef = useRef<HTMLFormElement | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formRef.current) return

        emailjs
            .sendForm(
                'service_kai5al5',
                'template_feepo1a',
                formRef.current,
                'hCS0IHarjxuWOm4BO'
            )
            .then(() => {
                setFormStatus({ submitted: true, error: false })
                setFormData({ name: '', email_id: '', subject: '', message: '' })
                setTimeout(() => setFormStatus({ submitted: false, error: false }), 5000)
            })
            .catch((error) => {
                console.error('EmailJS error:', error)
                setFormStatus({ submitted: false, error: true })
            })
    }
    return (
        <section id="contact" className="py-16 bg-gray-50 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
                        We'd love to hear from you. Reach out to us with any questions or inquiries.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                        <div className="space-y-14">
                            <div className="flex items-start">
                                <MapPinIcon className="h-6 w-6 text-blue-600" />
                                <div className="ml-3 text-gray-600">
                                    <p className="font-medium">Address</p>
                                    <p>123 Watch Avenue</p>
                                    <p>Ho Chi Minh City, Vietnam</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <PhoneIcon className="h-6 w-6 text-blue-600" />
                                <div className="ml-3 text-gray-600">
                                    <p className="font-medium">Phone</p>
                                    <p>+(84) 123456789</p>
                                    <p>Mon-Fri from 8am to 6pm</p>
                                    <p>Sat-Sun-Holidays off</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MailIcon className="h-6 w-6 text-blue-600" />
                                <div className="ml-3 text-gray-600">
                                    <p className="font-medium">Email</p>
                                    <p>support@luxwatch.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email_id">Email Address</Label>
                                <Input
                                    id="email_id"
                                    type="email"
                                    name="email_id"
                                    value={formData.email_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <input type="hidden" name="from_email" value={formData.email_id} />
                            <input type="hidden" name="reply_to" value={formData.email_id} />

                            <div className="space-y-1">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Send Message
                                <SendIcon size={16} className="ml-2" />
                            </Button>

                            {formStatus.submitted && (
                                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            {formStatus.error && (
                                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                    There was an error sending your message. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
