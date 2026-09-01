"use client";

import Image from "next/image";
import { School } from "lucide-react";
import { useEffect, useRef } from "react";

export function SchoolIllustration() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    if (!("IntersectionObserver" in window)) {
      stage.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => stage.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="school-line-stage">
      <div className="school-line-art">
        <Image
          src="/about/st-anthony-school-line.png"
          unoptimized
          priority
          alt="Minimal black-line architectural illustration of St. Anthony School"
          width={2048}
          height={1024}
        />
      </div>
      <div className="school-line-caption">
        <div>
          <School aria-hidden="true" />
          <p><strong>St. Anthony School</strong><span>Singalong, Manila · 2023</span></p>
        </div>
      </div>
    </div>
  );
}
