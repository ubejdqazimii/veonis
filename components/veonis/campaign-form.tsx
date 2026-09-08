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
  const [activeGift,setActiveGift]=useState(0);
  const gift = campaign.giveaways[activeGift];
  const giftDescription = gift?.description.replace(/\*([^*]+)\*/g, "$1") ?? "";
  const preview = giftDescription.length > 180 ? giftDescription.slice(0,180).replace(/\s+\S*$/, "") + " …" : giftDescription;
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
  return <section className={s.section}><div className={s.layout}><div className={s.story}><span className={s.eyebrow}><Gift size={17}/> VEONIS · GIVEAWAY</span><h1>{campaign.title}</h1><p className={s.description}>{campaign.description}</p><div className={s.prizeHeading}><h2>Die Gewinne im Überblick</h2><span>{campaign.giveaways.length} {campaign.giveaways.length === 1 ? "Giveaway" : "Giveaways"}</span></div>
{gift && <div className={s.prizeExplorer}>
  {campaign.giveaways.length > 1 && <div className={s.giftTabs} role="tablist" aria-label="Gewinne entdecken">{campaign.giveaways.map((item,i)=><button type="button" key={i} role="tab" id={`gift-tab-${i}`} aria-selected={i===activeGift} aria-controls="gift-panel" tabIndex={i===activeGift?0:-1} onClick={()=>setActiveGift(i)} onKeyDown={event=>{const count=campaign.giveaways.length;const next=event.key==="ArrowRight"?(i+1)%count:event.key==="ArrowLeft"?(i-1+count)%count:event.key==="Home"?0:event.key==="End"?count-1:null;if(next!==null){event.preventDefault();setActiveGift(next);document.getElementById(`gift-tab-${next}`)?.focus();}}}><span>{String(i+1).padStart(2,"0")}</span><span>{item.title}</span></button>)}</div>}
  <article id="gift-panel" role={campaign.giveaways.length>1?"tabpanel":undefined} aria-labelledby={campaign.giveaways.length>1?`gift-tab-${activeGift}`:undefined} className={s.compactGift}>
    <div className={s.giftOverview}>{gift.image && <div className={s.compactImage}><Image src={gift.image} alt={gift.image_alt||gift.title} fill sizes="140px" className={s.giftPhoto}/></div>}<div><span className={s.eyebrow}>GEWINN {String(activeGift+1).padStart(2,"0")}</span><h3>{gift.title}</h3></div></div>
    <p className={s.giftPreview}>{preview}</p>
    {giftDescription.length>180 && <details key={activeGift} className={s.giftDetails}><summary>Alle Details zum Gewinn</summary><p>{giftDescription}</p></details>}
  </article>
</div>}
<a className={s.jumpToForm} href="#participation-form">Zum Teilnahmeformular <ArrowRight size={16}/></a>
<p className={s.trust}><ShieldCheck size={18}/> Persönlich. Transparent. Veonis.</p></div><div className={s.panel} id="participation-form">{success ? <div role="status" className={s.success}><CheckCircle2 size={48}/><h2>Vielen Dank für Ihre Teilnahme!</h2><p>Ihre Anmeldung für «{campaign.title}» wurde erfasst.</p><Link href="/de">Veonis entdecken <ArrowRight size={17}/></Link></div> : <><span className={s.eyebrow}>IHRE TEILNAHME</span><h2>Jetzt mitmachen.</h2><p className={s.helper}>Bitte füllen Sie alle Felder aus.</p><form onSubmit={submit}><fieldset disabled={busy}><legend className={s.srOnly}>Ihre Kontaktdaten</legend><div className={s.fields}>{fields.map(field=><label key={field.name} htmlFor={field.name}>{field.label}<input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} min={field.name==="birth_year"?1900:undefined} max={field.name==="birth_year"?new Date().getFullYear():undefined} pattern={field.name==="zip_code"?"[0-9]{4}":undefined} inputMode={field.name==="zip_code"||field.name==="birth_year"?"numeric":undefined} required aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name]?`${field.name}-error`:undefined}/>{errors[field.name]&&<small id={`${field.name}-error`} className={s.error}>Bitte prüfen Sie dieses Feld.</small>}</label>)}</div><div className={s.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><details className={s.terms}><summary>Teilnahmebedingungen lesen</summary><p>{campaign.terms}</p></details><label className={s.consent}><input type="checkbox" name="consent" required/ ><span>{campaign.consent_text} <Link href="/de/legal/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung öffnen</Link>.</span></label>{error&&<p role="alert" className={s.error}>{error}</p>}<button className={s.submit} type="submit">{busy?"Wird gespeichert …":"Teilnahme absenden"}<ArrowRight size={17}/></button></fieldset></form></>}</div></div></section>;
}
