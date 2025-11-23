import axios from "axios";
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

let isInitialized = false;

export const useCometChatLogin = () => {
  const login = async () => {
    try {
      const { data } = await axios.get("/api/cometchat/auth-token");

      const { uid, authToken, appId, region } = data;

      if (!authToken || !appId || !region) {
        console.warn("⚠️ Incomplete CometChat configuration from backend");
        return;
      }

      if (!isInitialized) {
        const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(appId)
          .setRegion(region)
          .subscribePresenceForAllUsers()
          .build();

        await CometChatUIKit.init(UIKitSettings);
        isInitialized = true;
        console.log("✔️ CometChat initialized with server config");
      }

      await CometChatUIKit.loginWithAuthToken(authToken);

      console.log("✔️ CometChat login success for", uid);
    } catch (err) {
      console.error("❌ CometChat login error", err);
      throw err;
    }
  };

  return { login };
};
