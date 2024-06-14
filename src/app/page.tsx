"use-client"

import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Team } from "@/components/Team";
import "@/App.css";

export default function App() {
    return (
        <>
            <Hero />
            <About />
            <HowItWorks />
            <Features />
            <Team />
            <FAQ />
            <Footer />
        </>
    );
}
