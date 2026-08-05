"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorSmartphone, PenTool, Printer, Signpost, ArrowRight, CheckCircle2, FileQuestion, Mail, Phone, MapPin } from "lucide-react";

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
  dict: any;
  lang: string;
};

export default function GetAQuoteClient({ dynamicServices = [], dynamicBudgets = [], dict, lang }: GetAQuoteClientProps) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const defaultServices = [
    { id: "web", title: "Web Design", iconName: "MonitorSmartphone" },
    { id: "graphic", title: "Graphic Design", iconName: "PenTool" },
    { id: "print", title: "Printing", iconName: "Printer" },
    { id: "signage", title: "Digital Signage", iconName: "Signpost" },
  ];

  const defaultBudgets = [
    { id: "under_1k", label: "Under $1,000" },
    { id: "1k_to_5k", label: "$1,000 - $5,000" },
    { id: "5k_to_10k", label: "$5,000 - $10,000" },
    { id: "10k_plus", label: "$10,000+" }
  ];

  const services = dynamicServices.length > 0 ? dynamicServices : defaultServices;
  const budgets = dynamicBudgets.length > 0 ? dynamicBudgets : defaultBudgets;

  const timelines = [
    { id: "asap", label: dict?.step2?.timelineOptions?.asap || "ASAP (Urgent)" },
    { id: "1_month", label: dict?.step2?.timelineOptions?.["1_month"] || "Within 1 month" },
    { id: "1_3_months", label: dict?.step2?.timelineOptions?.["1_3_months"] || "1 - 3 months" },
    { id: "flexible", label: dict?.step2?.timelineOptions?.flexible || "Flexible" },
  ];

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
        body: JSON.stringify({ ...formData, lang }),
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

  return (
    <section className="py-20 px-6 lg:px-8 flex-grow flex items-center bg-zinc-950 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -top-48 -left-48"></div>
        <div className="absolute w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[150px] bottom-0 right-0 translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Corporate Branding & Trust */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Let's Build Something <span className="text-brand-primary">Extraordinary</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
              {dict?.step1?.subtitle || "Partner with us to elevate your brand's digital and physical presence. Whether you need a high-converting website, stunning graphic design, or premium print materials, our team is ready to deliver excellence."}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-zinc-800/50 p-4 rounded-2xl">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Call Us Directly</p>
                  <p className="text-white font-semibold text-lg">+1 (438) 393-9465</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-800/50 relative h-64 bg-zinc-900 group">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=490+Avenue+Ampere,+Laval+QC+H7N+5J9&output=embed`}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                ></iframe>
                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Service Area</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-brand-dark to-zinc-900 border border-zinc-800">
              <p className="text-sm text-zinc-300 italic mb-4">
                "Cozuna transformed our brand into something modern, professional, and memorable. Their creativity and understanding of our business made the process seamless."
              </p>
              <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">— Degan Tax</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: The Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] border border-zinc-800 p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                >
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{dict?.success?.title || "Quote Request Sent!"}</h2>
                  <p className="text-zinc-400 max-w-md mx-auto mb-8 text-lg">
                    {dict?.success?.message || "Thank you for reaching out. Our team is reviewing your project details and will be in touch shortly."}
                  </p>
                  <button 
                    onClick={() => window.location.href = `/${lang}`}
                    className="rounded-full bg-brand-primary px-8 py-4 text-sm font-bold text-white hover:bg-red-500 transition-colors shadow-lg shadow-brand-primary/20"
                  >
                    Return to Homepage
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                      1. {dict?.step1?.title || "Select Service"}
                    </label>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {services.map((svc) => {
                        const isSelected = formData.service === svc.id;
                        const IconComponent = IconMap[svc.iconName] || FileQuestion;
                        return (
                          <button
                            type="button"
                            key={svc.id}
                            onClick={() => setFormData({ ...formData, service: svc.id })}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                              isSelected 
                                ? "border-brand-primary bg-brand-primary/10 shadow-lg shadow-brand-primary/10" 
                                : "border-zinc-800 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-800/50"
                            }`}
                          >
                            <IconComponent className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-brand-primary" : "text-zinc-500"}`} />
                            <span className={`text-sm font-semibold ${isSelected ? "text-white" : "text-zinc-400"}`}>
                              {dict?.services?.[svc.id] || svc.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-800/50">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                        2. {dict?.step2?.budgetLabel || "Estimated Budget"}
                      </label>
                      <div className="flex flex-col gap-2">
                        {budgets.map((b) => (
                          <button
                            type="button"
                            key={b.id}
                            onClick={() => setFormData({ ...formData, budget: b.id })}
                            className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                              formData.budget === b.id
                                ? "border-brand-primary bg-brand-primary text-white"
                                : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-white"
                            }`}
                          >
                            {dict?.budgets?.[b.id] || b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                        3. {dict?.step2?.timelineLabel || "Timeline"}
                      </label>
                      <div className="flex flex-col gap-2">
                        {timelines.map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setFormData({ ...formData, timeline: t.id })}
                            className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                              formData.timeline === t.id
                                ? "border-brand-primary bg-brand-primary text-white"
                                : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-white"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="pt-6 border-t border-zinc-800/50">
                    <label className="block text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                      4. {dict?.step3?.title || "Your Information"}
                    </label>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                          <input 
                            type="text" 
                            placeholder={dict?.step3?.firstName || "First Name"} 
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-zinc-600 group-hover:border-zinc-700"
                          />
                        </div>
                        <div className="relative group">
                          <input 
                            type="text" 
                            placeholder={dict?.step3?.lastName || "Last Name"} 
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-zinc-600 group-hover:border-zinc-700"
                          />
                        </div>
                      </div>
                      <div className="relative group">
                        <input 
                          type="email" 
                          placeholder={dict?.step3?.email || "Email Address"} 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-zinc-600 group-hover:border-zinc-700"
                        />
                      </div>
                      <div className="relative group">
                        <textarea 
                          placeholder={dict?.step3?.message || "Tell us about your project..."} 
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-brand-primary outline-none resize-none transition-all placeholder:text-zinc-600 group-hover:border-zinc-700"
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold text-center">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!formData.service || !formData.budget || !formData.timeline || !formData.firstName || !formData.lastName || !formData.email || !formData.message || isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-primary/20 hover:bg-red-500 hover:shadow-brand-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (dict?.buttons?.submitting || "Sending...") : (dict?.buttons?.submit || "Submit Request")}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
