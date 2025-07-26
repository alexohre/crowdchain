"use client";
import { useAccount } from "@starknet-react/core";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import Hero from "./Hero";
import MyDashboard from "./MyDashboard";

export default function Dashboard() {
    const { isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) {
            notFound();
        }
    }, [isConnected]);

    // Don't render anything if not connected (will redirect to 404)
    if (!isConnected) {
        return null;
    }

    return (
        <div>
            <Hero/>
            <MyDashboard/>
        </div>
    )
}
