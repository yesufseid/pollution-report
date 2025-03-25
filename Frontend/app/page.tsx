"use client";
import { useEffect, useState } from "react";
import PollutionMap from "./component/Map";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <div>
      {isBrowser && <PollutionMap />}
    </div>
  );
}

