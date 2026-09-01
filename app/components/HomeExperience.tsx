"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { PointerEvent, useEffect, useRef, useState } from "react";
import styles from "./HomeExperience.module.css";

const moods = ["happy", "sleepy", "excited", "cheeky"] as const;
const galleryScenes = [
  { image: "/experience/city-billboard.webp", title: "The original, out in the city", flavor: "Plain Dropwich", shape: "arch" },
  { image: "/experience/ingredient-studio.webp", title: "Comfort, layer by layer", flavor: "Ham Dropwich", shape: "wide" },
  { image: "/experience/picnic-table.webp", title: "A sunny table for three", flavor: "Dropwich Picnic", shape: "organic" },
  { image: "/experience/collectible-lineup.webp", title: "Pick your kind of day", flavor: "The Full Lineup", shape: "pill" },
] as const;

function EggdropMascot({ mood }: { mood: typeof moods[number] }) {
  return <span className={`${styles.eggMascot} ${styles[mood]}`} aria-hidden="true"><span className={styles.eggWhite}><span className={styles.eggYolk} /></span><span className={styles.eggFace}><i /><i /><b /></span></span>;
}

export function EggdropPattern({ story = false }: { story?: boolean }) {
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const paused = userPaused || hoverPaused;
  return <section className={`${styles.patternSection} ${story ? styles.storyPattern : ""}`} aria-labelledby={story ? "story-eggdrop-title" : "eggdrop-title"}>
    <div className={styles.sectionHeading}>
      <div><span>{story ? "A living brand mark" : "Meet the mood"}</span><h2 id={story ? "story-eggdrop-title" : "eggdrop-title"}>{story ? <>One simple egg.<br />Plenty of character.</> : <>Every egg has<br />a personality.</>}</h2></div>
      <div><p>{story ? "The Eggdrop pattern turns one familiar ingredient into a playful, repeatable part of the Dropwich identity." : "A close-knit cast of original Eggdrops brings the menu to life—quietly moving, blinking, and reacting as one."}</p><div className={styles.headingActions}><Link href={story ? "/story/why" : "/menu"}>{story ? "Why Dropwich" : "Explore the menu"} <ArrowRight /></Link><button className={styles.motionControl} type="button" aria-pressed={userPaused} onClick={() => setUserPaused(value => !value)}>{userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{userPaused ? "Play pattern" : "Pause pattern"}</button></div></div>
    </div>
    <div className={styles.patternFrame} onMouseEnter={() => setHoverPaused(true)} onMouseLeave={() => setHoverPaused(false)}>
      <div className={`${styles.patternTrack} ${paused ? styles.paused : ""}`} aria-hidden="true">
        {[...Array(96)].map((_, index) => <EggdropMascot key={index} mood={moods[index % moods.length]} />)}
      </div>
    </div>
  </section>;
}

export function DropwichGallery({ story = false }: { story?: boolean }) {
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const paused = userPaused || interactionPaused;
  const galleryRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const rail = galleryRef.current;
    if (!rail || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = () => {
      rail.scrollLeft += 0.55;
      if (rail.scrollLeft >= rail.scrollWidth / 2) rail.scrollLeft -= rail.scrollWidth / 2;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    const rail = galleryRef.current;
    if (!rail) return;
    drag.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    setInteractionPaused(true);
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current.active && galleryRef.current) galleryRef.current.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  };
  const endDrag = () => { drag.current.active = false; setInteractionPaused(false); };

  return <section className={`${styles.gallerySection} ${story ? styles.storyGallery : ""}`} aria-labelledby={story ? "story-gallery-title" : "gallery-title"}>
    <div className={styles.sectionHeading}>
      <div><span>{story ? "Dropwich in motion" : "Dropwich scenes"}</span><h2 id={story ? "story-gallery-title" : "gallery-title"}>{story ? <>From a hallway<br />to a whole world.</> : <>Made to make<br />your day better.</>}</h2></div>
      <div><p>{story ? "The original menu reimagined as a growing visual world—still rooted in the sandwiches, colors, and packaging from 2023." : "Fresh favorites with the warmth and personality that shaped the original student venture."}</p><div className={styles.headingActions}><span className={styles.dragHint}>Moves on its own · drag or swipe anytime</span><button className={styles.motionControl} type="button" aria-pressed={userPaused} onClick={() => setUserPaused(value => !value)}>{userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{userPaused ? "Play gallery" : "Pause gallery"}</button></div></div>
    </div>
    <div className={styles.galleryViewport} ref={galleryRef} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onMouseEnter={() => setInteractionPaused(true)} onMouseLeave={() => { if (!drag.current.active) setInteractionPaused(false); }}>
      <div className={styles.galleryRail}>{[...galleryScenes, ...galleryScenes].map((scene, index) => <article className={`${styles.galleryCard} ${styles[scene.shape]}`} key={`${scene.image}-${index}`}><Image src={scene.image} alt={index < galleryScenes.length ? scene.title : ""} width={1536} height={1536} loading="lazy" sizes="(max-width: 760px) 78vw, 38vw" /><div><span>{scene.flavor}</span><strong>{scene.title}</strong></div></article>)}</div>
    </div>
  </section>;
}

export function HomeExperience() {
  return <><EggdropPattern /><DropwichGallery /></>;
}
