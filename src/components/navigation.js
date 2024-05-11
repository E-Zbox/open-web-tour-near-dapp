import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// assets
import NearLogo from "/public/near-logo.svg";
// store
import { useStore } from "@/app/layout";
// styles
import { Button, MainNav, MainTitle } from "@/styles/Navbar.styles";
import { FlexContainer } from "@/styles/shared/Container.styles";

export const Navigation = () => {
  const { signedAccountId, wallet } = useStore();
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setIsSignedIn(true);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

  useEffect(() => {
    if (isSignedIn) {
      setLabel(`Logout`);
    }
  }, [isSignedIn]);

  return (
    <MainNav>
      <FlexContainer
        $flexDirection="row"
        $justifyContent="space-between"
        $alignItems="center"
      >
        <FlexContainer
          $flexDirection="row"
          $alignItems="center"
          $width="fit-content"
        >
          <Link href="/" passHref legacyBehavior>
            <Image
              priority
              src={NearLogo}
              alt="NEAR"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </Link>
          <MainTitle>Dapps Over Apps</MainTitle>
        </FlexContainer>
        <Button onClick={action}>
          {" "}
          {label} {isSignedIn ? <b>{signedAccountId}</b> : <></>}{" "}
        </Button>
      </FlexContainer>
    </MainNav>
  );
};
