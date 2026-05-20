"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { inquiryTypes } from "@/lib/content";

const inquiryEnum = z.enum(inquiryTypes);

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  inquiry_type: inquiryEnum,
  message: z.string().min(10, "Please write at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  simplified?: boolean;
  /** Preset inquiry type when the simplified form hides the dropdown */
  defaultInquiryType?: (typeof inquiryTypes)[number];
};

export function ContactForm({ simplified, defaultInquiryType }: Props) {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: simplified
      ? { inquiry_type: defaultInquiryType ?? "General inquiry" }
      : { inquiry_type: defaultInquiryType ?? inquiryTypes[0] },
  });

  async function onSubmit(data: FormData) {
    setStatus("idle");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus("ok");
      reset();
    } else {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === "ok" && (
        <p className="rounded-xl bg-green-light px-4 py-3 font-inter text-sm text-green-dark" role="status">
          Thank you — your message was received. We will respond within 48 hours.
        </p>
      )}
      {status === "err" && (
        <p className="rounded-xl bg-gold-light px-4 py-3 font-inter text-sm text-text-dark" role="alert">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
      <div>
        <label
          htmlFor="cf-name"
          className="mb-1 block font-inter text-sm font-medium text-text-dark"
        >
          Full Name *
        </label>
        <input
          id="cf-name"
          {...register("name")}
          autoComplete="name"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.name && (
          <p className="mt-1 font-inter text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="cf-email"
          className="mb-1 block font-inter text-sm font-medium text-text-dark"
        >
          Email Address *
        </label>
        <input
          id="cf-email"
          type="email"
          {...register("email")}
          autoComplete="email"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.email && (
          <p className="mt-1 font-inter text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="cf-phone"
          className="mb-1 block font-inter text-sm font-medium text-text-dark"
        >
          Phone (Optional)
        </label>
        <input
          id="cf-phone"
          type="tel"
          {...register("phone")}
          autoComplete="tel"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
      </div>
      {simplified ? (
        <input type="hidden" {...register("inquiry_type")} />
      ) : (
        <div>
          <label
            htmlFor="cf-type"
            className="mb-1 block font-inter text-sm font-medium text-text-dark"
          >
            How Can We Help? *
          </label>
          <select
            id="cf-type"
            {...register("inquiry_type")}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
          >
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.inquiry_type && (
            <p className="mt-1 font-inter text-xs text-red-600">
              {errors.inquiry_type.message}
            </p>
          )}
        </div>
      )}
      <div>
        <label
          htmlFor="cf-msg"
          className="mb-1 block font-inter text-sm font-medium text-text-dark"
        >
          Your Message *
        </label>
        <textarea
          id="cf-msg"
          {...register("message")}
          rows={5}
          className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.message && (
          <p className="mt-1 font-inter text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-navy py-3.5 font-inter text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
