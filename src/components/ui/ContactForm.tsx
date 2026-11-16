"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { inquiryTypes } from "@/lib/content";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";

const inquiryEnum = z.enum(inquiryTypes);

const schema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters").max(120, "Name is too long"),
  email: z.string().trim().email("Valid email required").max(254, "Email is too long"),
  phone: z.string().trim().max(80, "Phone number is too long").optional(),
  inquiry_type: inquiryEnum,
  message: z.string().trim().min(10, "Please write at least 10 characters").max(5000, "Message is too long"),
});

type FormData = z.infer<typeof schema>;
type Props = {
  simplified?: boolean;
  /** Preset inquiry type when the simplified form hides the dropdown */
  defaultInquiryType?: (typeof inquiryTypes)[number];
  turnstileSiteKey?: string;
};

export function ContactForm({ simplified, defaultInquiryType, turnstileSiteKey }: Props) {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const turnstileEnabled = Boolean(turnstileSiteKey);

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

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  async function onSubmit(data: FormData) {
    setStatus("idle");
    setErrorMessage(null);

    if (turnstileEnabled && !turnstileToken) {
      setStatus("err");
      setErrorMessage("Please complete the security check.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setErrorMessage(payload.error || "Something went wrong. Please try again or call us directly.");
        return;
      }

      setStatus("ok");
      reset();
      setTurnstileToken(null);
      setWidgetKey((k) => k + 1);
    } catch {
      setStatus("err");
      setErrorMessage("Could not connect to MHA. Please try again or contact us directly.");
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
          {errorMessage}
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
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.name && (
          <p id="cf-name-error" className="mt-1 font-inter text-xs text-red-600">{errors.name.message}</p>
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
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.email && (
          <p id="cf-email-error" className="mt-1 font-inter text-xs text-red-600">{errors.email.message}</p>
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
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "cf-phone-error" : undefined}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.phone && (
          <p id="cf-phone-error" className="mt-1 font-inter text-xs text-red-600">{errors.phone.message}</p>
        )}
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
            required
          aria-invalid={Boolean(errors.inquiry_type)}
          aria-describedby={errors.inquiry_type ? "cf-type-error" : undefined}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
          >
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.inquiry_type && (
            <p id="cf-type-error" className="mt-1 font-inter text-xs text-red-600">
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
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-msg-error" : undefined}
          className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 font-inter text-sm transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
        />
        {errors.message && (
          <p id="cf-msg-error" className="mt-1 font-inter text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>
      {turnstileEnabled ? (
        <div className="space-y-2">
          <p className="font-inter text-xs text-text-muted">
            Complete the security check below, then click Send Message.
          </p>
          <TurnstileWidget
            key={widgetKey}
            siteKey={turnstileSiteKey!}
            onToken={handleTurnstileToken}
            onExpire={handleTurnstileExpire}
          />
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting || (turnstileEnabled && !turnstileToken)}
        className="w-full rounded-full bg-navy py-3.5 font-inter text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
