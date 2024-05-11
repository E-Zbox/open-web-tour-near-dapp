"use client";
import { useEffect, useState } from "react";
// config
import { HelloNearContract } from "@/config";
// screens
import ScreenOne from "@/screens/ScreenOne";
// store
import { useStore } from "../layout";

export default function HelloNear() {
  const { signedAccountId, wallet } = useStore();

  const [greeting, setGreeting] = useState("loading...");
  const [newGreeting, setNewGreeting] = useState("loading...");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    // wallet.viewMethod({ contractId: HelloNearContract, method: "get_greeting" }).then((greeting) => setGreeting(greeting));
  }, [wallet]);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const storeGreeting = async () => {
    setShowSpinner(true);
    await wallet.callMethod({
      contractId: CONTRACT,
      method: "set_greeting",
      args: { greeting: newGreeting },
    });
    const greeting = await wallet.viewMethod({
      contractId: CONTRACT,
      method: "get_greeting",
    });
    setGreeting(greeting);
    setShowSpinner(false);
  };

  return (
    <>
      <ScreenOne />
    </>
  );
}

/*[
  {
    id: 0,
    creator: "flmel.testnet",
    created_at: 1715280643974891500,
    title: "my event",
    estimated_budget: 1,
    total_votes: 5,
    description: "myeventdescription",
    votes: [
      "flmel.testnet",
      "ifeadiputin.testnet",
      "winning11.testnet",
      "winning11.testnet",
      "winning11.testnet",
    ],
  },
  {
    id: 1,
    creator: "ifeadiputin.testnet",
    created_at: 1715334581446831400,
    title: "apple",
    estimated_budget: 1,
    total_votes: 4,
    description: "apple",
    votes: [
      "ifeadiputin.testnet",
      "ifeadiputin.testnet",
      "ifeadiputin.testnet",
      "winning11.testnet",
    ],
  },
  {
    id: 2,
    creator: "mazixyz.testnet",
    created_at: 1715421818453486800,
    title: "56",
    estimated_budget: 9,
    total_votes: 0,
    description: "some textmm",
    votes: [],
  },
  {
    id: 3,
    creator: "mazixyz.testnet",
    created_at: 1715432587519531800,
    title: "Testing",
    estimated_budget: 2,
    total_votes: 0,
    description: "this should be descriptive but I'm testing",
    votes: [],
  },
];
*/
