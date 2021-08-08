import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { CloudDownload } from "react-bootstrap-icons"

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

declare global {
    interface WindowEventMap {
      beforeinstallprompt: BeforeInstallPromptEvent;
    }
  }

const PWAButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent>();

  useEffect(() => {

    const handler = (e:Event) => {
        const e2 = e as BeforeInstallPromptEvent
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e2);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = () => {
    if (!promptInstall) {
      return;
    }
    if (promptInstall) {
        promptInstall.prompt();
    }
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Button variant="light" onClick={onClick} className="ml-1"> 
    <CloudDownload />
  </Button>

  );
};

export default PWAButton;

