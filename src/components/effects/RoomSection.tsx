"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useRoom } from "@/context/RoomContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Room } from "@/types";

interface RoomSectionProps {
  children: ReactNode;
  room: Room;
  className?: string;
  id?: string;
}

export default function RoomSection({
  children,
  room,
  className = "",
  id,
}: RoomSectionProps) {
  const { setRoom } = useRoom();
  const { ref, isInView } = useInView({ threshold: 0.5, once: false });

  useEffect(() => {
    if (isInView) {
      setRoom(room);
    }
  }, [isInView, room, setRoom]);

  const bgColor = room === "dark" ? "bg-dark-bg" : "bg-light-bg";
  const textColor = room === "dark" ? "text-dark-text" : "text-light-text";

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative",
        bgColor,
        textColor,
        "transition-colors duration-700",
        className,
      )}
    >
      {children}
    </section>
  );
}
