"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowDown, Pause, Play, Scissors, Camera, Film, Download, Mail } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { projects, email } from "@/lib/portfolio-data";
import { HomeAbout, CareerDetails, VideoProcess, AuraTitle, SectionTransition } from "./Enhancements";
import { summary } from "@/lib/career-details";
import "./improvements.css";
import "./motion-refinement.css";
type Section = "home" | "career" | "editing" | "chitchat";
const nav:[string,string,string][] = [["home","Home","/"],["career","Career","/career"],["editing","Editing","/editing"],["chitchat","Chitchat","/chitchat"]];
const clips = ["A quiet kind of power","After the dark","Find the rhythm","Into another world","Eyes on the story","One last frame"];
const instagram="https://www.instagram.com/johnalokpatel?utm_source=qr&igsi=MTh2cHFnMTd1dXNhYg==";
const linkedin="https://www.linkedin.com/in/johnalokpatel/";
const linktree="https://linktr.ee/johnapatel";
const github="https://github.com/Johnapatel";

/* Brand SVG icons inline */
function InstagramIcon(){return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>;}
function LinkedInIcon(){return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;}
function GitHubIcon(){return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;}
function LinktreeIcon(){return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.51 5.099l4.575-4.61 2.04 2.04-4.64 4.572 6.515.012v2.883l-6.515-.012 4.64 4.572-2.04 2.04L13.51 11.98l-4.576 4.616-2.04-2.04 4.64-4.572H4.92V7.1h6.614L6.894 2.529l2.04-2.04 4.576 4.61zM11.01 24h2.04V13.58H11.01V24z"/></svg>;}

const socials = [
  [InstagramIcon,"Instagram",instagram],
  [LinkedInIcon,"LinkedIn",linkedin],
  [GitHubIcon,"GitHub",github],
  [LinktreeIcon,"Linktree",linktree],
] as const;

function Loop({n,motion,className=""}:{n:number;motion:boolean;className?:string}){
 const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return;const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting&&motion)el.play().catch(()=>{});else el.pause()},{threshold:.1});ob.observe(el);if(!motion)el.pause();return()=>ob.disconnect()},[motion]);
 return <video ref={ref} className={className} src={`/media/loop-${n}.mp4`} poster={`/media/loop-${n}-poster.webp`} muted loop playsInline preload="metadata" aria-label={`Solo Leveling temporary visual ${n}`}/>;
}

function Contact({triggerClassName="round-cta",label="Send a message"}:{triggerClassName?:string;label?:string}){
 const [state,setState]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const data=new FormData(form);if(data.get("_honey"))return;setBusy(true);setState("");try{const res=await fetch(`https://formsubmit.co/ajax/${email}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object.fromEntries(data))});const result=await res.json() as {success?:boolean|string};if(!res.ok||!(result.success===true||result.success==="true"))throw new Error();setState("Submission accepted. Thanks for reaching out! You can also email me directly below.");form.reset()}catch{setState("That didn't go through. Please try again or use the email link below.")}finally{setBusy(false)}}
 return <Dialog><DialogTrigger asChild><Button className={triggerClassName}>{label} <ArrowUpRight size={22}/></Button></DialogTrigger><DialogContent className="contact-dialog"><div className="contact-aura" aria-hidden="true"/><DialogTitle>Get in Touch</DialogTitle><DialogDescription>Send your message here. You won't be taken away from the portfolio.</DialogDescription><form onSubmit={submit}><label className="sr-only" htmlFor="name">Your name</label><Input id="name" name="name" placeholder="Your Name" required maxLength={100}/><label className="sr-only" htmlFor="email">Your email</label><Input id="email" name="email" type="email" placeholder="Your Email" required/><label className="sr-only" htmlFor="subject">Subject</label><Input id="subject" name="_subject" placeholder="Subject" required maxLength={200}/><label className="sr-only" htmlFor="message">Your message</label><Textarea id="message" name="message" placeholder="Your Message" required minLength={10} maxLength={5000}/><input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true"/><input type="hidden" name="_template" value="table"/><Button type="submit" disabled={busy}>{busy?"Sending…":"Send Message"}</Button><p role="status">{state}</p></form><div className="contact-direct"><a href={`mailto:${email}`}><Mail size={17}/>{email}</a><div>{socials.map(([Icon,lbl,url])=><a key={lbl} href={url} target="_blank" rel="noreferrer" aria-label={lbl} className="contact-social-icon"><Icon/></a>)}</div></div><small>Your message is sent securely through FormSubmit.</small></DialogContent></Dialog>
}

export default function Portfolio({section}:{section:Section}){
 const root=useRef<HTMLDivElement>(null);const [motion,setMotion]=useState(true);const [theme,setTheme]=useState("dark");const [tone,setTone]=useState([58]);
 useEffect(()=>{const saved=localStorage.getItem("alok-theme");const selected=saved==="light"?"light":"dark";setTheme(selected);document.documentElement.dataset.theme=selected},[]);
 function toggleTheme(){const next=theme==="light"?"dark":"light";setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem("alok-theme",next)}
 useEffect(()=>{if(!motion||section!=="career")return;const cards=Array.from(document.querySelectorAll<HTMLElement>(".project-card"));const move=(e:PointerEvent)=>{if(e.pointerType!=="mouse")return;cards.forEach(card=>{const b=card.getBoundingClientRect();const dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2);const near=e.clientX>b.left-100&&e.clientX<b.right+100&&e.clientY>b.top-100&&e.clientY<b.bottom+100;card.style.setProperty("--glow-x",`${e.clientX-b.left}px`);card.style.setProperty("--glow-y",`${e.clientY-b.top}px`);card.style.setProperty("--near",near?"1":"0");card.style.setProperty("--lift",near?"-5px":"0px");card.style.setProperty("--tilt",near?`${Math.max(-1.3,Math.min(1.3,dx/400))}deg`:"0deg")})};window.addEventListener("pointermove",move);return()=>{window.removeEventListener("pointermove",move);cards.forEach(c=>{c.style.setProperty("--near","0");c.style.setProperty("--lift","0px");c.style.setProperty("--tilt","0deg")})}},[motion,section]);

 useEffect(()=>{if(!motion||!root.current)return;gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
  // Existing animations
  gsap.from(".entrance",{y:70,opacity:0,stagger:.13,duration:1.15,ease:"power3.out"});
  gsap.from(".hero-person",{y:180,scale:2.5,rotation:12,opacity:0,filter:"blur(20px)",transformOrigin:"bottom center",duration:2,ease:"expo.out",delay:.1});
  const hero=document.querySelector(".home-hero");
  if(hero){
    hero.addEventListener("pointermove",(e:any)=>{
      const rect=hero.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-0.5;
      const y=(e.clientY-rect.top)/rect.height-0.5;
      gsap.to(".hero-person",{rotationY:x*35,rotationX:-y*15,x:x*40,ease:"power2.out",duration:1});
    });
    hero.addEventListener("pointerleave",()=>{
      gsap.to(".hero-person",{rotationY:0,rotationX:0,x:0,ease:"power2.out",duration:1.5});
    });
  }
  gsap.utils.toArray<HTMLElement>(".reveal").forEach(el=>gsap.from(el,{y:55,opacity:0,duration:.9,scrollTrigger:{trigger:el,start:"top 93%"}}));
  gsap.utils.toArray<HTMLElement>(".drift-type").forEach(el=>gsap.to(el,{xPercent:-15,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:1}}));
  const mm=gsap.matchMedia();mm.add("(min-width: 900px)",()=>{const reel=document.querySelector<HTMLElement>(".reel-track");if(reel)gsap.to(reel,{x:()=>-(reel.scrollWidth-window.innerWidth+100),ease:"none",scrollTrigger:{trigger:".reel-section",pin:true,start:"top top",end:()=>`+=${reel.scrollWidth}`,scrub:1,invalidateOnRefresh:true}})});

  // ── NEW INTER-SECTION ANIMATIONS ──

  // Section headings: split line reveal
  gsap.utils.toArray<HTMLElement>(".section-heading h2, .career-hero h1, .home-end > a").forEach(el=>{
   gsap.from(el,{clipPath:"inset(0 100% 0 0)",opacity:0,duration:1.1,ease:"power4.out",scrollTrigger:{trigger:el,start:"top 90%"}});
  });

  // World cards: staggered fly-in from bottom
  gsap.from(".world-card",{y:100,opacity:0,stagger:.18,duration:1.1,ease:"back.out(1.2)",scrollTrigger:{trigger:".world-grid",start:"top 85%"}});

  // Project cards: cascade reveal with clip-path wipe
  gsap.utils.toArray<HTMLElement>(".project-card").forEach((card,i)=>{
   gsap.from(card,{x:i%2===0?-80:80,opacity:0,duration:.9,delay:i*.08,ease:"power3.out",scrollTrigger:{trigger:card,start:"top 88%"}});
  });

  // Ticker: fade+scale in
  gsap.from(".ticker",{scaleX:.85,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:".ticker",start:"top 95%"}});

  // Floating particles on hero
  const heroParticles=document.querySelectorAll<HTMLElement>(".hero-particle");
  heroParticles.forEach((p,i)=>{
   gsap.to(p,{y:-40-(i*15),x:Math.sin(i)*25,opacity:[0,.7,0],duration:3+i*.5,repeat:-1,ease:"sine.inOut",delay:i*.4});
  });

  // Section dividers: draw left-to-right
  gsap.utils.toArray<HTMLElement>(".section-bar").forEach(bar=>{
   gsap.from(bar,{scaleX:0,transformOrigin:"left",duration:.9,ease:"power3.out",scrollTrigger:{trigger:bar,start:"top 92%"}});
  });

  // Edit title: dramatic slide + blur
  gsap.from(".edit-title h1",{x:-120,opacity:0,filter:"blur(18px)",duration:1.2,ease:"expo.out"});
  gsap.from(".edit-title p",{x:-60,opacity:0,duration:.9,delay:.3,ease:"power3.out"});

  // Reel heading: parallax drift
  gsap.utils.toArray<HTMLElement>(".reel-heading").forEach(h=>{
   gsap.from(h,{y:50,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:h,start:"top 88%"}});
  });

  // Timeline entries: staggered y-reveal
  gsap.utils.toArray<HTMLElement>(".timeline-group").forEach(group=>{
   gsap.from(group,{y:60,opacity:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:group,start:"top 88%"}});
  });

  // Home-about section: horizontal split reveal
  gsap.from(".home-about",{clipPath:"inset(0 0 100% 0)",opacity:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:".home-about",start:"top 85%"}});

  // Services articles: stagger up
  gsap.utils.toArray<HTMLElement>(".services article").forEach((art,i)=>{
   gsap.from(art,{y:50,opacity:0,duration:.75,delay:i*.15,ease:"power3.out",scrollTrigger:{trigger:art,start:"top 90%"}});
  });

  // Toolbox items: stagger slide-in
  gsap.utils.toArray<HTMLElement>(".toolbox p").forEach((item,i)=>{
   gsap.from(item,{x:-40,opacity:0,duration:.65,delay:i*.1,ease:"power3.out",scrollTrigger:{trigger:item,start:"top 92%"}});
  });

  // Edit process steps: bounce in
  gsap.utils.toArray<HTMLElement>(".process-step").forEach((step,i)=>{
   gsap.from(step,{y:60,opacity:0,scale:.92,duration:.8,delay:i*.12,ease:"back.out(1.3)",scrollTrigger:{trigger:step,start:"top 88%"}});
  });

  // Skill pills: pop in with spring
  gsap.utils.toArray<HTMLElement>(".skill-pills span").forEach((pill,i)=>{
   gsap.from(pill,{scale:0,opacity:0,duration:.5,delay:.3+i*.05,ease:"back.out(2)",scrollTrigger:{trigger:pill,start:"top 94%"}});
  });

  // Social connections: slide up
  gsap.from(".social-connections a",{y:20,opacity:0,stagger:.08,duration:.6,ease:"power3.out",scrollTrigger:{trigger:".social-connections",start:"top 92%"}});

  // Chat bubbles: pop in
  gsap.from(".bubble-one",{scale:0,opacity:0,duration:.7,delay:.5,ease:"back.out(2)"});
  gsap.from(".bubble-two",{scale:0,opacity:0,duration:.7,delay:.8,ease:"back.out(2)"});

  // About facts: count-style reveal
  gsap.utils.toArray<HTMLElement>(".about-facts span").forEach((span,i)=>{
   gsap.from(span,{y:30,opacity:0,duration:.6,delay:.2+i*.15,ease:"power3.out",scrollTrigger:{trigger:span,start:"top 93%"}});
  });

 },root);return()=>ctx.revert()},[section,motion]);

 function tilt(e:React.PointerEvent<HTMLElement>){if(!motion||e.pointerType!=="mouse")return;const b=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--rx",`${-(e.clientY-b.top-b.height/2)/35}deg`);e.currentTarget.style.setProperty("--ry",`${(e.clientX-b.left-b.width/2)/35}deg`)}
 return <div ref={root} className={`site page-${section} ${motion?"motion-on":"motion-off"}`}><SectionTransition motion={motion} section={section}/><a className="skip" href="#main">Skip to content</a><header className="site-header"><a href="/" className="brand brand-jinwoo" aria-label="Alok Patel home"><img src="/media/loop-5.gif" alt="Animated Sung Jinwoo"/></a><nav aria-label="Main navigation">{nav.map(([key,title,url])=><a key={key} href={url} aria-current={section===key?"page":undefined}>{title}</a>)}</nav><div className="header-actions"><button className="theme-button" onClick={toggleTheme} aria-label={theme==="light"?"Switch to dark theme":"Switch to light theme"}>{theme==="light"?"◐":"☀"}<span>{theme==="light"?"Dark":"Light"}</span></button><button className="motion-button" onClick={()=>setMotion(!motion)} aria-label={motion?"Pause animations":"Resume animations"}>{motion?<Pause size={14}/>:<Play size={14}/>}<span>Motion {motion?"on":"off"}</span></button>
 {/* Connect button now opens contact popup */}
 <Contact triggerClassName="connect-link-btn" label="Connect"/></div></header>
 <main id="main">
 {/* Floating hero particles */}
 {section==="home"&&<div className="hero-particles" aria-hidden="true">{Array.from({length:8},(_,i)=><span key={i} className="hero-particle" style={{left:`${10+i*11}%`,top:`${30+Math.sin(i)*25}%`,animationDelay:`${i*.5}s`}}/>)}</div>}
 {section==="home"&&<><section className="home-hero"><div className="hero-top entrance"><span>A MULTIDISCIPLINARY MIND</span><span>BASED IN INDIA · OPEN TO WHAT'S NEXT</span></div><div className="hero-title"><h1 className="entrance">hey,<br/><span>I'm Alok.</span></h1><div className="portrait-orbit" aria-hidden="true"/><img className="hero-person" src="/media/hero.webp" alt="Sung Jinwoo from Solo Leveling, a temporary portrait"/><span className="portrait-note">CURRENT ALTER EGO ↗</span></div><div className="hero-bottom entrance"><p>I build things.<br/>I tell stories.<br/><em>Always curious.</em></p><p>A little logic. A little lens.<br/>A lot of figuring things out<br/>and making them my own.</p><a href="#choose" className="scroll-link">SCROLL TO EXPLORE <ArrowDown size={18}/></a></div><span className="hero-star" aria-hidden="true">✳</span></section><section className="worlds" id="choose"><div className="section-heading reveal"><span className="eyebrow">01 / TWO SIDES, ONE MIND</span><h2>Choose your<br/><em>rabbit hole.</em></h2><p>Different pursuits.<br/>The same curiosity.</p></div><div className="world-grid"><a href="/career" className="world-card world-code" onPointerMove={tilt} onPointerLeave={e=>{e.currentTarget.style.setProperty("--rx","0deg");e.currentTarget.style.setProperty("--ry","0deg")}}><div className="card-top"><span>THE BUILDER</span><ArrowUpRight/></div><div className="code-art" aria-hidden="true">&lt;<span>/</span>&gt;</div><h3>Logic, meet<br/><em>possibility.</em></h3><p>Software · Data · Applied AI</p><span className="underlink">Explore my career ↗</span></a><a href="/editing" className="world-card world-film"><Loop n={3} motion={motion}/><div className="card-top"><span>THE STORYTELLER</span><ArrowUpRight/></div><div className="world-film-text"><h3>Life, through<br/><em>another lens.</em></h3><p>Editing · Videography · Creation</p><span className="underlink">Step inside the edit ↗</span></div></a></div></section><HomeAbout/><section className="home-end reveal"><span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span><a href="/chitchat">Got a thought?<br/><em>Let's chitchat.</em> ↗</a></section></>}
 {section==="career"&&<><section className="career-hero section-pad"><span className="eyebrow entrance">01 / THE TECH SIDE</span><h1 className="entrance">Curiosity.<br/>Made <em>tangible.</em></h1><div className="career-intro entrance">
      <p>{summary}</p>
      <div className="resume-container">
        <span className="eyebrow resume-hint">ACCESS THE FULL LOG</span>
        <a className="solo-button" href="/Alok-Patel-Resume.pdf" download>Download résumé <Download size={22}/></a>
      </div>
    </div></section><section className="projects section-pad"><div className="section-bar"><span>SELECTED PROJECTS</span><span>01 — 06</span></div>{projects.map(p=><Dialog key={p.id}><DialogTrigger asChild><button className={`project-card project-${p.theme}`}><div className="project-meta"><span>{p.number} / {p.category}</span><ArrowUpRight/></div><div className="project-main"><h2>{p.title}</h2><div className="project-symbol"><p.Icon strokeWidth={1}/></div></div><div className="project-bottom"><p>{p.description}</p><span>{p.stack.slice(0,3).join(" / ")}</span><b>View story ↗</b></div></button></DialogTrigger><DialogContent className="story-dialog"><span className="eyebrow">{p.category}</span><DialogTitle>{p.title}</DialogTitle><DialogDescription>{p.question}</DialogDescription><p>{p.introduction}</p><div className="story-metric"><strong>{p.metric}</strong><span>{p.metricLabel}</span></div>{p.sections.map(([title,body])=><section key={title}><h3>{title}</h3><p>{body}</p></section>)}<p className="story-note">{p.note}</p><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div>{p.github&&<a className="project-github-link" href={p.github} target="_blank" rel="noreferrer"><GitHubIcon/>View on GitHub <ArrowUpRight size={14}/></a>}</DialogContent></Dialog>)}</section><CareerDetails motion={motion}/></>}
 {section==="editing"&&<><section className="edit-hero"><Loop n={1} motion={motion} className="edit-background"/><div className="edit-shade"/><div className="edit-hero-top entrance"><span>ALOK PATEL / VISUAL STORIES</span><span>REC <i/></span></div><div className="edit-title entrance"><span className="eyebrow">BEYOND THE CODE</span><h1>Into the<br/><em>frame.</em></h1><p>Chasing the feeling between the frames.</p></div><div className="edit-hero-bottom"><span>EDITING · VIDEOGRAPHY · CONTENT CREATION</span><a href="#reel">ENTER THE EDIT <ArrowDown size={17}/></a></div></section><section className="editing-intro section-pad reveal"><span className="eyebrow">A DIFFERENT SIDE OF THE SAME MIND</span><h2>I collect moments.<br/><em>Then find their rhythm.</em></h2><p>I'm a video editor, a traveller and a curious storyteller. Somewhere between a mountain trail, a swim and the next destination, there's always a story worth making.</p><VideoProcess/></section><section className="reel-section" id="reel"><div className="reel-heading"><div><span className="eyebrow">THE CUTTING ROOM / 06 SLOTS</span><h2>Motion studies<span>®</span></h2></div><p>Solo Leveling temporary samples.<br/>My own edits are coming here next.</p></div><div className="reel-track">{clips.map((title,i)=><Dialog key={title}><DialogTrigger asChild><button className="clip-card"><div className="clip-image"><Loop n={i+1} motion={motion}/><span className="play-circle"><Play size={23}/></span><span className="clip-index">0{i+1} / 06</span></div><div className="clip-caption"><h3>{title}</h3><ArrowUpRight/></div><span className="clip-label">SOLO LEVELING · TEMPORARY SAMPLE</span></button></DialogTrigger><DialogContent className="video-dialog"><DialogTitle>{title}</DialogTitle><DialogDescription>Solo Leveling placeholder — to be replaced with my edited video.</DialogDescription><video src={`/media/loop-${i+1}.mp4`} controls loop playsInline autoPlay={motion} muted poster={`/media/loop-${i+1}-poster.webp`}/></DialogContent></Dialog>)}</div></section><section className="lens section-pad"><div className="section-heading reveal"><span className="eyebrow">COLOUR / A STUDY IN MOOD</span><h2>A change<br/><em>of tone.</em></h2><p>Same frame.<br/>A different feeling.</p></div><div className="comparison"><img src="/images/studio-art.webp" alt="Warm orange light on a sculptural metallic surface"/><img className="mono" src="/images/studio-art.webp" alt="" style={{clipPath:`inset(0 0 0 ${tone[0]}%)`}}/><div className="comparison-line" style={{left:`${tone[0]}%`}}><span>↔</span></div><span className="compare-label left">WARM</span><span className="compare-label right">MONO</span><Slider className="image-comparison-control" value={tone} onValueChange={setTone} min={2} max={98} step={1} ref={el=>{el?.querySelector('[role="slider"]')?.setAttribute("aria-label","Warm to monochrome comparison")}}/></div><p className="comparison-hint">DRAG THE IMAGE TO CHANGE THE MOOD ↔</p><div className="services">{[[Scissors,"Inside the edit.","Pacing, sound, colour and the details that make a story feel right.","VIDEO EDITING"],[Camera,"Behind the lens.","Finding a point of view through composition, light and movement.","VIDEOGRAPHY"],[Film,"Out in the world.","Starting my own content journey. Exploring ideas, making videos and finding my voice.","CONTENT CREATION"]].map(([Icon,title,body,label],i)=>{const I=Icon as typeof Camera;return <article key={String(title)}><div><I size={21}/><span>0{i+1}</span></div><h3>{String(title)}</h3><p>{String(body)}</p><small>{String(label)}</small></article>})}</div><div className="toolbox reveal"><span className="eyebrow">ON MY TIMELINE</span><h2>The tools.<br/><em>The possibilities.</em></h2><div>{["Adobe Premiere Pro","After Effects","Photoshop","DaVinci Resolve"].map((s,i)=><p key={s}><img className="tool-logo" src={`/tool-logos/${["premiere-pro","after-effects","photoshop","davinci-resolve"][i]}.svg`} alt=""/>{s}<small>{i===3?"LEARNING":"IN MY TOOLKIT"}</small></p>)}</div></div></section><div className="edit-outro"><AuraTitle/><a className="outline-link" href="/chitchat">Have a story in mind? <ArrowUpRight/></a></div></>}
 {section==="chitchat"&&<section className="chitchat-main"><div className="chat-copy"><span className="eyebrow chitchat-eyebrow entrance">04 / NO FORMALITIES NECESSARY</span><h1 className="entrance">Great things<br/>start with<br/><em>a hello.</em></h1><p className="entrance chitchat-p">A new opportunity. A story to tell.<br/>Or just a really good conversation.</p><div className="entrance"><Contact/></div><a className="email-link entrance" href={`mailto:${email}`}><Mail size={17}/>{email} <ArrowUpRight size={17}/></a><div className="social-connections entrance">{socials.map(([Icon,label,url])=><a key={label} href={url} target="_blank" rel="noreferrer"><Icon/><span>{label}</span></a>)}</div></div><div className="handshake-scene"><span className="chat-bubble bubble-one">Hey, Alok! 👋</span><img src={motion?"/media/handshake.webp":"/media/handshake-still.png"} alt="Two people meeting and shaking hands"/><span className="chat-bubble bubble-two">Let's make it happen.</span><span className="handshake-caption">GOOD ENERGY. GREAT POSSIBILITIES.</span></div></section>}
 </main><footer><a className="footer-brand" href="/">Alok Patel<span>®</span></a><span>A LITTLE LOGIC. A LITTLE LENS.</span><div><a href={instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={linktree} target="_blank" rel="noreferrer">Linktree ↗</a><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${email}`}>Email ↗</a></div><small>© {new Date().getFullYear()}</small></footer></div>
}
