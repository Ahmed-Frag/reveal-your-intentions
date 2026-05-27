"use client";

import { useState } from "react";
import Header from "./components/Header";
import HeroText from "./components/HeroText";
import IntentInput from "./components/IntentInput";
import IntentFirstResult from "./components/IntentFirstResult";
import ResultSkeleton from "./components/ResultSkeleton";
import SmartReplyCard from "./components/SmartReplyCard.jsx";

export default function Home() {
  const [relationship, setRelationship] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);
  const [showResult, setShowResult] = useState(false);
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Header />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-5 pt-36 pb-20">
        <HeroText />
        <IntentInput
          onRelationshipChange={setRelationship}
          setShowResult={setShowResult}
          setLoadingResult={setLoadingResult}
        />
        {loadingResult && <ResultSkeleton />}
        {showResult && !loadingResult && (
          <IntentFirstResult show={showResult} relationship={relationship} />
        )}
        {showResult && !loadingResult && <SmartReplyCard show={showResult} />}
      </section>
    </main>
  );
}
