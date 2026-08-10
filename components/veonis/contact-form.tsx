"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/veonis-content";

const contactSchema = z.object({
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein."),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().min(6, "Bitte geben Sie eine Telefonnummer ein."),
  clientType: z.string().min(1, "Bitte wählen Sie eine Kategorie."),
  interest: z.string().min(1, "Bitte wählen Sie ein Thema."),
  message: z.string().min(10, "Bitte schreiben Sie kurz, worum es geht."),
  contactMethod: z.string().min(1, "Bitte wählen Sie eine Kontaktart."),
  privacy: z.boolean().refine((value) => value, "Bitte akzeptieren Sie den Datenschutz-Hinweis."),
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const interests = [
  "360°-Check",
  "Versicherungen & Vorsorge",
  "Hypotheken & Immobilien",
  "Steuern & Finanzplanung",
  "Anlagen & Vermögensaufbau",
  "Firmenkundenberatung",
  "Karriere",
  "Allgemeine Anfrage",
];

const contactMethods = ["Telefon", "E-Mail", "Videocall", "Persönlicher Termin"];

export function ContactForm({ locale }: { locale: Locale }) {
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      clientType: "",
      interest: "",
      contactMethod: "",
      privacy: false,
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setReference(null);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          sourceUrl: window.location.href,
        }),
      });
      const payload = (await response.json()) as { message?: string; reference?: string };

      if (!response.ok || !payload.reference) {
        throw new Error(payload.message);
      }

      setReference(payload.reference);
    } catch {
      setSubmitError(
        locale === "de"
          ? "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail."
          : "Your request could not be sent. Please try again or contact us by email.",
      );
    }
  }

  return (
    <form className="premium-card p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input autoComplete="off" tabIndex={-1} {...register("website")} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname" error={errors.firstName?.message}>
          <Input className="h-12 bg-white" {...register("firstName")} />
        </Field>
        <Field label="Nachname" error={errors.lastName?.message}>
          <Input className="h-12 bg-white" {...register("lastName")} />
        </Field>
        <Field label="E-Mail" error={errors.email?.message}>
          <Input className="h-12 bg-white" type="email" {...register("email")} />
        </Field>
        <Field label="Telefonnummer" error={errors.phone?.message}>
          <Input className="h-12 bg-white" type="tel" {...register("phone")} />
        </Field>
        <Field label="Privatperson oder Firma" error={errors.clientType?.message}>
          <select className="form-select" {...register("clientType")}>
            <option value="">Bitte wählen</option>
            <option value="Privatperson">Privatperson</option>
            <option value="Firma">Firma</option>
          </select>
        </Field>
        <Field label="Interessiert an" error={errors.interest?.message}>
          <select className="form-select" {...register("interest")}>
            <option value="">Bitte wählen</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-2" label="Gewünschte Kontaktaufnahme" error={errors.contactMethod?.message}>
          <select className="form-select" {...register("contactMethod")}>
            <option value="">Bitte wählen</option>
            {contactMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-2" label="Nachricht" error={errors.message?.message}>
          <Textarea className="min-h-36 bg-white" {...register("message")} />
        </Field>
      </div>
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#f7f7f6] p-4">
        <Checkbox
          checked={watch("privacy")}
          className="mt-1 border-[#c63d4d] data-checked:bg-[#c63d4d]"
          onCheckedChange={(value) => setValue("privacy", value === true, { shouldValidate: true })}
        />
        <div>
          <p className="text-sm leading-6 text-[#4b5563]">
            Ich bin damit einverstanden, dass Veonis meine Angaben zur Bearbeitung der Anfrage verwendet.
          </p>
          {errors.privacy?.message ? (
            <p className="mt-1 text-sm text-[#c63d4d]">{errors.privacy.message}</p>
          ) : null}
        </div>
      </div>
      <Button
        className="mt-6 h-12 w-full rounded-full bg-[#c63d4d] text-white hover:bg-[#b23443] sm:w-auto sm:px-8"
        disabled={isSubmitting}
        type="submit"
      >
        Anfrage senden
      </Button>
      {reference ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#c63d4d]/20 bg-[#c63d4d]/10 p-4 text-sm font-medium text-[#8f2632]">
          <CheckCircle className="size-5" />
          <span>
            {locale === "de" ? "Danke. Ihre Anfrage wurde übermittelt." : "Thank you. Your request has been received."}
            <span className="ml-1 text-xs opacity-70">#{reference.slice(0, 8)}</span>
          </span>
        </div>
      ) : null}
      {submitError ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800" role="alert">
          {submitError}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-[#111827]">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm text-[#c63d4d]">{error}</span> : null}
    </label>
  );
}
