"use client";

import {
  KnockFeedProvider,
  KnockProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useRef, useState } from "react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

type NotificationsMenuProps = {
  userId?: string;
};

// Source: https://knock.app/blog/how-to-send-in-app-notifications-nextjs13
export const NotificationsMenu = (props: NotificationsMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef<HTMLButtonElement>(null);

  if (!props.userId) {
    return null;
  }

  return (
    <KnockProvider
      apiKey={process.env.KNOCK_PUBLIC_API_KEY!}
      userId={props.userId}
      // In production, you must pass a signed userToken
      // and enable enhanced security mode in your Knock dashboard
      // userToken={currentUser.knockUserToken}
    >
      <KnockFeedProvider feedId={"823b21c4-dd00-4fc6-9725-25e3fc0d9132"}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />

          <NotificationFeedPopover
            buttonRef={notifButtonRef as React.RefObject<HTMLElement>}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
