"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Gift, ShieldCheck } from "lucide-react";
import s from "./campaign-form.module.css";
export type LeadCampaign = {title:string;slug:string;description:string;giveaways:{title:string;description:string;image?:string|null;image_alt?:string}[];terms:string;revision:string;consent_text:string};
const fields = [
  {name:"first_name",label:"Vorname",autoComplete:"given-name",type:"text",maxLength:100},
  {name:"last_name",label:"Nachname",autoComplete:"family-name",type:"text",maxLength:100},
  {name:"zip_code",label:"Postleitzahl",autoComplete:"postal-code",type:"text",maxLength:4},
  {name:"city",label:"Ort",autoComplete:"address-level2",type:"text",maxLength:100},
  {name:"email",label:"E-Mail",autoComplete:"email",type:"email",maxLength:255},
  {name:"mobile",label:"Mobilnummer",autoComplete:"tel",type:"tel",maxLength:40},
  {name:"birth_year",label:"Geburtsjahr",autoComplete:"bday-year",type:"number",maxLength:4},
];
export function CampaignForm({campaign}:{campaign:LeadCampaign}) {
  const [busy,setBusy]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState("");
  const [errors,setErrors]=useState<Record<string,string[]>>({});
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(busy)return;
    setBusy(true);setError("");setErrors({});
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/campaigns/${campaign.slug}/leads`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(data),consent:data.get("consent")==="on",revision:campaign.revision})});
      const body=await response.json();
      if(!response.ok){setError(body.message ?? "Bitte versuchen Sie es erneut.");setErrors(body.errors ?? {});return;}
      setSuccess(true);
    } catch {setError("Keine Verbindung. Ihre Teilnahme wurde nicht bestätigt. Bitte versuchen Sie es erneut.");} finally {setBusy(false);}
  }
  return <section className={s.section}><div className={s.layout}><div className={s.story}><span className={s.eyebrow}><Gift size={17}/> VEONIS · GIVEAWAY</span><h1>{campaign.title}</h1><p className={s.description}>{campaign.description}</p><h2>Das erwartet Sie</h2><div className={s.prizes}>{campaign.giveaways.map((gift,i)=><article key={i}>{gift.image&&<div className={s.giftImage}><Image src={gift.image} alt={gift.image_alt || gift.title} fill sizes="(min-width: 801px) 480px, 90vw" className={s.giftPhoto}/></div>}<div className={s.giftCopy}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{gift.title}</h3><p>{gift.description}</p></div></div></article>)}</div><p className={s.trust}><ShieldCheck size={18}/> Persönlich. Transparent. Veonis.</p></div><div className={s.panel}>{success ? <div role="status" className={s.success}><CheckCircle2 size={48}/><h2>Vielen Dank für Ihre Teilnahme!</h2><p>Ihre Anmeldung für «{campaign.title}» wurde erfasst.</p><Link href="/de">Veonis entdecken <ArrowRight size={17}/></Link></div> : <><span className={s.eyebrow}>IHRE TEILNAHME</span><h2>Jetzt mitmachen.</h2><p className={s.helper}>Bitte füllen Sie alle Felder aus.</p><form onSubmit={submit}><fieldset disabled={busy}><legend className={s.srOnly}>Ihre Kontaktdaten</legend><div className={s.fields}>{fields.map(field=><label key={field.name} htmlFor={field.name}>{field.label}<input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} min={field.name==="birth_year"?1900:undefined} max={field.name==="birth_year"?new Date().getFullYear():undefined} pattern={field.name==="zip_code"?"[0-9]{4}":undefined} inputMode={field.name==="zip_code"||field.name==="birth_year"?"numeric":undefined} required aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name]?`${field.name}-error`:undefined}/>{errors[field.name]&&<small id={`${field.name}-error`} className={s.error}>Bitte prüfen Sie dieses Feld.</small>}</label>)}</div><div className={s.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><details className={s.terms}><summary>Teilnahmebedingungen lesen</summary><p>{campaign.terms}</p></details><label className={s.consent}><input type="checkbox" name="consent" required/ ><span>{campaign.consent_text} <Link href="/de/legal/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung öffnen</Link>.</span></label>{error&&<p role="alert" className={s.error}>{error}</p>}<button className={s.submit} type="submit">{busy?"Wird gespeichert …":"Teilnahme absenden"}<ArrowRight size={17}/></button></fieldset></form></>}</div></div></section>;
}
