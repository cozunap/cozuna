"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorSmartphone, PenTool, Printer, Signpost, ArrowRight, ArrowLeft, CheckCircle2, FileQuestion } from "lucide-react";

const IconMap: Record<string, any> = {
  MonitorSmartphone,
  PenTool,
  Printer,
  Signpost
};

type Service = {
  id: string;
  title: string;
  iconName: string;
};

type Budget = {
  id: string;
  label: string;
};

type GetAQuoteClientProps = {
  dynamicServices?: Service[];
  dynamicBudgets?: Budget[];
};

export default function GetAQuoteClient({ dynamicServices = [], dynamicBudgets = [] }: GetAQuoteClientProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    budget: "",
    timeline: "",
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultServices = [
    { id: "web", title: "Web Design", iconName: "MonitorSmartphone" },
    { id: "graphic", title: "Graphic Design", iconName: "PenTool" },
    { id: "print", title: "Printing", iconName: "Printer" },
    { id: "signage", title: "Signage", iconName: "Signpost" },
  ];

  const defaultBudgets = [
    { id: "under_1k", label: "Under $1,000" },
    { id: "1k_to_5k", label: "$1,000 - $5,000" },
    { id: "5k_to_10k", label: "$5,000 - $10,000" },
    { id: "10k_plus", label: "$10,000+" }
  ];

  const services = dynamicServices.length > 0 ? dynamicServices : defaultServices;
  const budgets = dynamicBudgets.length > 0 ? dynamicBudgets : defaultBudgets;

  const handleNext = () => {
    if (step === 1 && !formData.service) return; // Basic validation
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please check your credentials or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <>
      {/* Wizard Content */}
      <section className="py-12 px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <div className="mx-auto max-w-4xl w-full">
          
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="mb-12 relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-zinc-900">
                <motion.div 
                  initial={{ width: "33%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary"
                ></motion.div>
              </div>
              <div className="flex justify-between text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                <span className={step >= 1 ? "text-brand-primary" : ""}>Service</span>
                <span className={step >= 2 ? "text-brand-primary" : ""}>Details</span>
                <span className={step >= 3 ? "text-brand-primary" : ""}>Contact</span>
              </div>
            </div>
          )}

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-12 min-h-[450px] relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait" custom={1}>
              
              {/* SUCCESS STATE */}
              {isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">Quote Request Sent!</h2>
                  <p className="text-zinc-400 max-w-md mx-auto mb-8">
                    Thank you for reaching out, {formData.firstName}. Our team will review your request and get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => window.location.href = "/"}
                    className="rounded-full bg-zinc-800 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
                  >
                    Return to Home
                  </button>
                </motion.div>
              )}

              {/* STEP 1: SERVICE */}
              {!isSubmitted && step === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">What do you need help with?</h2>
                  <p className="text-zinc-400 mb-8">Select the primary service you are interested in.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {services.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => setFormData({ ...formData, service: svc.id })}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col items-start ${
                          formData.service === svc.id 
                            ? "border-brand-primary bg-brand-primary/10" 
                            : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
                        }`}
                      >
                        {(() => {
                          const IconComponent = IconMap[svc.iconName] || FileQuestion;
                          return <IconComponent className="w-8 h-8 mb-4 text-brand-primary" />;
                        })()}
                        <h3 className="text-lg font-semibold text-white">{svc.title}</h3>
                      </button>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-end">
                    <button
                      onClick={handleNext}
                      disabled={!formData.service}
                      className="flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DETAILS */}
              {!isSubmitted && step === 2 && (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Project Details</h2>
                  <p className="text-zinc-400 mb-8">Tell us a bit more about the scope of the work.</p>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Estimated Budget</label>
                      <select 
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                      >
                        <option value="" disabled>Select a budget range</option>
                        {budgets.map((b) => (
                          <option key={b.id} value={b.id}>{b.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Ideal Timeline</label>
                      <select 
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                      >
                        <option value="" disabled>Select a timeline</option>
                        <option value="asap">ASAP (Urgent)</option>
                        <option value="1_month">Within 1 month</option>
                        <option value="1_3_months">1 - 3 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between">
                    <button
                      onClick={handlePrev}
                      className="flex items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!formData.budget || !formData.timeline}
                      className="flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CONTACT */}
              {!isSubmitted && step === 3 && (
                <motion.div
                  key="step3"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Your Information</h2>
                  <p className="text-zinc-400 mb-8">Almost done! How can we reach you?</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mb-8 flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="First Name" 
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Last Name" 
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                      />
                    </div>
                    <div>
                      <textarea 
                        placeholder="Tell us a little more about your vision (optional)" 
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none resize-none"
                      />
                    </div>

                    <div className="mt-auto flex flex-col pt-4 border-t border-zinc-800">
                      {errorMessage && (
                        <div className="mb-4 text-sm text-red-500 font-semibold text-center">
                          {errorMessage}
                        </div>
                      )}
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="flex items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          type="submit"
                          disabled={!formData.firstName || !formData.lastName || !formData.email || isSubmitting}
                          className="flex items-center gap-2 rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSubmitting ? "Sending..." : "Submit Request"}
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
