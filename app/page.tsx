import { redirect } from "next/navigation";
import "./globals.css";

export default function Home() {
  redirect("/login");
  return null;
}
