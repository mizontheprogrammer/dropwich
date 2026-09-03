"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PointerEvent, useEffect, useRef, useState } from "react";
import styles from "./HomeExperience.module.css";

const moods = ["happy", "sleepy", "excited", "cheeky"] as const;
const galleryScenes = [
  { image: "/experience/city-billboard.webp", title: "Plain Dropwich displayed in the city", shape: "arch" },
  { image: "/experience/ingredient-studio.webp", title: "Ham Dropwich surrounded by its ingredients", shape: "wide" },
  { image: "/experience/picnic-table.webp", title: "Three Dropwich sandwiches on a picnic table", shape: "organic" },
  { image: "/experience/collectible-lineup.webp", title: "The complete Dropwich sandwich lineup", shape: "pill" },
] as const;

function EggdropMascot({ mood }: { mood: typeof moods[number] }) {
  return <span className={`${styles.eggMascot} ${styles[mood]}`} aria-hidden="true"><span className={styles.eggWhite}><span className={styles.eggYolk} /></span><span className={styles.eggFace}><i /><i /><b /></span></span>;
}

export function EggdropPattern({ story = false }: { story?: boolean }) {
  return <section className={`${styles.patternSection} ${story ? styles.storyPattern : ""}`} aria-labelledby={story ? "story-eggdrop-title" : "eggdrop-title"}>
    <div className={styles.sectionHeading}>
      <div><span>{story ? "A living brand mark" : "Meet the mood"}</span><h2 id={story ? "story-eggdrop-title" : "eggdrop-title"}>{story ? <>One simple egg.<br />Plenty of character.</> : <>Every egg has<br />a personality.</>}</h2></div>
      <div><p>{story ? "The Eggdrop pattern turns one familiar ingredient into a playful, repeatable part of the Dropwich identity." : "A close-knit cast of original Eggdrops brings the menu to life—quietly moving, blinking, and reacting as one."}</p><Link href={story ? "/story/why" : "/menu"}>{story ? "Why Dropwich" : "Explore the menu"} <ArrowRight /></Link></div>
    </div>
    <div className={styles.patternFrame}>
      <div className={styles.patternTrack} aria-hidden="true">
        {[...Array(96)].map((_, index) => <EggdropMascot key={index} mood={moods[index % moods.length]} />)}
      </div>
    </div>
  </section>;
}

export function DropwichGallery({ story = false }: { story?: boolean }) {
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px 0px", threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = galleryRef.current;
    if (!rail || !inView || interactionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let position = rail.scrollLeft;
    let previousTime = performance.now();
    const move = (currentTime: number) => {
      const elapsed = Math.min(currentTime - previousTime, 50);
      previousTime = currentTime;
      position += elapsed * 0.028;
      const loopWidth = rail.scrollWidth / 2;
      if (position >= loopWidth) position -= loopWidth;
      rail.scrollLeft = position;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [inView, interactionPaused]);

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

  return <section ref={sectionRef} className={`${styles.gallerySection} ${story ? styles.storyGallery : ""}`} aria-labelledby={story ? "story-gallery-title" : "gallery-title"}>
    <div className={styles.sectionHeading}>
      <div><span>{story ? "Dropwich in motion" : "Dropwich scenes"}</span><h2 id={story ? "story-gallery-title" : "gallery-title"}>{story ? <>From a hallway<br />to a whole world.</> : <>Made to make<br />your day better.</>}</h2></div>
      <div><p>{story ? "The original menu reimagined as a growing visual world—still rooted in the sandwiches, colors, and packaging from 2023." : "Fresh favorites with the warmth and personality that shaped the original student venture."}</p></div>
    </div>
    <div className={styles.galleryViewport} ref={galleryRef} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
      <div className={styles.galleryRail}>{[...galleryScenes, ...galleryScenes].map((scene, index) => <article className={`${styles.galleryCard} ${styles[scene.shape]}`} key={`${scene.image}-${index}`}><Image src={scene.image} alt={index < galleryScenes.length ? scene.title : ""} width={1536} height={1536} loading="lazy" sizes="(max-width: 760px) 78vw, 38vw" /></article>)}</div>
    </div>
  </section>;
}
