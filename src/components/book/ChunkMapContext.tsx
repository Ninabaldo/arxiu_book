"use client";

import { createContext, useContext } from "react";
import type { ChunkMap } from "@/lib/book";

const ChunkMapContext = createContext<ChunkMap | null>(null);

export const ChunkMapProvider = ChunkMapContext.Provider;

export function useChunkMap(): ChunkMap | null {
  return useContext(ChunkMapContext);
}
