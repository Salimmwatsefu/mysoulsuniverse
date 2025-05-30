import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../../ui/Section';
import { FiMapPin, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: 'Personalized Coaching',
    preferredDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage({ type: '', text: '' });

    emailjs
      .send(
        'service_out0g19', // Replace with your EmailJS Service ID
        'template_o3nuf6a', // Replace with your EmailJS Template ID
        formState,
        '9B5wH-4Tq_SFaToI2' 
      )
      .then(
        () => {
          setIsSubmitting(false);
          setFormMessage({
            type: 'success',
            text: 'Thank you! Your booking request has been sent. We’ll contact you soon.',
          });
          setFormState({
            name: '',
            email: '',
            phone: '',
            sessionType: 'Personalized Coaching',
            preferredDate: '',
            message: '',
          });
          setTimeout(() => {
            setFormMessage({ type: '', text: '' });
          }, 5000);
        },
        (error) => {
          setIsSubmitting(false);
          setFormMessage({
            type: 'error',
            text: 'Oops! Something went wrong. Please try again.',
          });
          console.error('EmailJS error:', error);
        }
      );
  };

  return (
    <Section id="contact" bgColor="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-20 md:mx-10 mx-5">
        {/* Contact Information */}
        <div>
          <h1 className="text-dark-green font-semibold">GET IN TOUCH</h1>
          <h2 className="text-4xl mt-5">Contact Us Today</h2>
          <div className="h-1 w-20 mt-4 rounded bg-dark-green" />
          
          <div className="mt-8 space-y-6">
            <p className="text-gray-600">
              Let's embark on a journey of growth, transformation, and success—together. 
              Reach out to us to learn more about our services or to schedule a consultation.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pale-green rounded-lg text-primary">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Location</h4>
                  <p className="text-gray-600">2nd Floor, Mbandu Complex, Karen</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pale-green rounded-lg text-primary">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <a href="mailto:mysoulsuniverse@gmail.com" className="text-gray-600 hover:text-primary transition-colors">
                    info@mysoulsuniverse.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pale-green rounded-lg text-primary">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <a href="tel:+254728312076" className="text-gray-600 hover:text-primary transition-colors">
                    +254 728312076
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-bg p-8 rounded-xl shadow-soft"
        >
          <h3 className="font-bold text-xl mb-6">Book a Session </h3>
          
          {formMessage.text && (
            <div className={`p-4 rounded-lg mb-6 ${
              formMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {formMessage.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Type
                </label>
                <select
                  id="sessionType"
                  name="sessionType"
                  value={formState.sessionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                >
                  <option value="Personalized Coaching">Personalized Coaching</option>
                  <option value="Professional Training">Professional Training</option>
                  <option value="Psychosocial Support">Psychosocial Support</option>
                  <option value="Organizational Growth Solutions">Organizational Growth Solutions</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formState.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                  placeholder="Tell us about your needs or preferred session details"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-dark-green py-3 text-white rounded-md flex justify-center items-center ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;