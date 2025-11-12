import UiNotification from "./UiNotification.vue";

import { uuidv4 } from "uuidv7";
import { h, render, type VNode } from "vue";

import { UiNotificationType } from "@/lib/composables/useNotification/types.ts";

const margin = 16;
let existedNotifications: VNode[] = [];

export default function (message: string, type?: UiNotificationType, isHTMLMessage?: boolean, title?: string) {
  let topOffset = margin;
  for (const notificationComp of existedNotifications) {
    topOffset += notificationComp.el!.offsetHeight + margin;
  }

  const container = document.createElement("div");
  const removeComponent = () => {
    render(null, container!);
  };
  const id = uuidv4() as string;
  const notificationComponent = h(UiNotification, {
    id: id,
    top: topOffset,
    onDeleteFromList: deleteFromList,
    onRemove: removeComponent,
    message,
    type,
    isHTMLMessage,
    title
  });

  render(notificationComponent, container);
  existedNotifications.push(notificationComponent);
  document.body.appendChild(container.firstElementChild!);
}

function deleteFromList(id: string) {
  let topOffset = margin;
  existedNotifications = existedNotifications.filter((notificationComp) => id !== notificationComp.component!.props.id);
  existedNotifications.forEach((notificationComp) => {
    notificationComp.component!.props.top = topOffset;
    topOffset += notificationComp.el!.offsetHeight + margin;
  });
}
