import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { firebaseAuth } from "../../../firebase";

interface Props {
  children?: React.ReactNode;
}

const AuthenticatedOnly: React.FC = (props: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscriber = firebaseAuth.onAuthStateChanged((user) => {
      setAuthenticated(Boolean(user));
    });
    return () => {
      unsubscriber();
    };
  }, []);

  if (authenticated === false) {
    router.push("/auth/login");
    return null;
  }
  return <>{props.children}</>;
};

export default AuthenticatedOnly;
