"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Room } from "@/types";

interface RoomContextType {
  room: Room;
  setRoom: (room: Room) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

interface RoomProviderProps {
  children: ReactNode;
  initialRoom?: Room;
}

export function RoomProvider({
  children,
  initialRoom = "dark",
}: RoomProviderProps) {
  const [room, setRoom] = useState<Room>(initialRoom);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
