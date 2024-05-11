"use client";

// react
import { useEffect } from "react";
import { create as createStore } from "zustand";

// app
import { Navigation } from "@/components/navigation";
import { NetworkId, HelloNearContract } from "@/config";

// lib/registry
import StyledComponentsRegistry from "@/lib/registry";

// styles
import GlobalStyles from "@/styles/Global.styles";

// theme
import { ThemeProvider } from "styled-components";
import { theme } from "@/utils/data";

// wallet-selector
import { Wallet } from "@/wallets/near-wallet";

// store to share wallet and signedAccountId
export const useStore = createStore((set) => ({
  wallet: undefined,
  signedAccountId: "",
  setWallet: (wallet) => set({ wallet }),
  setSignedAccountId: (signedAccountId) => set({ signedAccountId }),
}));

// Layout Component
export default function RootLayout({ children }) {
  const { setWallet, setSignedAccountId } = useStore();

  useEffect(() => {
    const wallet = new Wallet({
      networkId: NetworkId,
      createAccessKeyFor: HelloNearContract,
    });
    wallet.startUp(setSignedAccountId);
    setWallet(wallet);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
            rel="stylesheet"
          ></link>
        </head>
        <body>
          <StyledComponentsRegistry>
            <Navigation />
            {children}
          </StyledComponentsRegistry>
        </body>
      </html>
      <GlobalStyles />
    </ThemeProvider>
  );
}
