import HomePage from "@/components/home/Home";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <main>
      <SpeedInsights />
      <HomePage />
    </main>
  );
}
