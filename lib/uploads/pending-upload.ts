"use client";

const KEY = "__pdfia_pending_upload__";

type PendingUpload = {
  file: File;
  name: string;
  size: number;
  ts: number;
};

type Bag = { current: PendingUpload | null };

function bag(): Bag {
  if (typeof window === "undefined") return { current: null };
  const w = window as unknown as { [KEY]?: Bag };
  if (!w[KEY]) w[KEY] = { current: null };
  return w[KEY];
}

export function setPendingUpload(file: File) {
  bag().current = { file, name: file.name, size: file.size, ts: Date.now() };
}

export function takePendingUpload(): PendingUpload | null {
  const b = bag();
  const v = b.current;
  b.current = null;
  return v;
}

export function peekPendingUpload(): PendingUpload | null {
  return bag().current;
}
