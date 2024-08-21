"use client";
import { useBalance } from "@repo/store"

export default function Balance() {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}