import React from "react";

import { action } from "@storybook/addon-actions";
import { Notification } from "..";

export default {
  title: "Notification",
  component: Notification
};

export const Default = () => <Notification>Notification</Notification>;
