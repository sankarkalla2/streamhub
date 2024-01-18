"use client";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState<String>("");
  const [identity, setIdentity] = useState<String>("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken?.jti;

        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setName(name);
        }
      } catch (err: any) {
        toast.error("somethinge went wrong");
      }
    };
    createToken();
  }, []);
  return {
    name,
    token,
    identity,
  };
};
