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
});

type ContactFormValues = z.infer<typeof contactSchema>;

const interests = [
  "Veonis 360° Analyse",
  "Versicherungen & Vorsorge",
  "Hypotheken & Immobilien",
  "Steuern & Finanzplanung",
  "Anlagen & Vermögensaufbau",
  "Firmenkundenberatung",
  "Karriere",
  "Allgemeine Anfrage",
];

const contactMethods = ["Telefon", "E-Mail", "Videocall", "Persönlicher Termin"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
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
    },
  });

  function onSubmit() {
    setSent(true);
  }

  return (
    <form className="premium-card p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
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
      {sent ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#c63d4d]/20 bg-[#c63d4d]/10 p-4 text-sm font-medium text-[#8f2632]">
          <CheckCircle className="size-5" />
          Danke. Die Formularvalidierung funktioniert; ein Versanddienst kann später angeschlossen werden.
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
