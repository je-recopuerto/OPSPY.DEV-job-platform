"use client";

import {
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react-notification-feed";
import { useRef, useState } from "react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react-notification-feed/dist/index.css";

type NotificationsMenuProps = {
  userId?: string;
};

// Source: https://knock.app/blog/how-to-send-in-app-notifications-nextjs13
export const NotificationsMenu = (props: NotificationsMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  if (!props.userId) {
    return null;
  }

  return (
    <KnockFeedProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_API_KEY!}
      feedId={"823b21c4-dd00-4fc6-9725-25e3fc0d9132"}
      userId={props.userId}
      // In production, you must pass a signed userToken
      // and enable enhanced security mode in your Knock dashboard
      // userToken={currentUser.knockUserToken}
    >
      <>
        <NotificationIconButton
          ref={notifButtonRef}
          onClick={(e) => setIsVisible(!isVisible)}
        />
        <NotificationFeedPopover
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </>
    </KnockFeedProvider>
  );
};
