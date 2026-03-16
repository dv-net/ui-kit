import { ref } from "vue";

import type { RouteItem } from "@/lib/components/UiLayoutMenu/types";
import { ProfileMenuItem } from "@/lib/components/UiProfileMenu/types";
import {
  addCircleAnimation,
  dashboardAnimation,
  documentAnimation,
  documentationAnimation,
  gridAnimation,
  gridOutlineAnimation,
  input1Animation,
  kycAnimation,
  languageAnimation,
  loginAnimation,
  menuInAnimation,
  newWindowsAnimation,
  notificationsAnimation,
  securityAnimation,
  settingsAnimation,
  sidebarAnimation,
  sortAnimation,
  support2Animation,
  telegramAnimation,
  toolsAnimation,
  twoArrowOutlineAnimation,
} from "@/lib/helpers/animations-list.ts";

export const menu = ref<RouteItem[]>([
  {
    path: "/buttons",
    meta: {
      title: "Buttons",
      animationIcon: toolsAnimation
    }
  },
  {
    path: "/icons",
    meta: {
      title: "Icons",
      animationIcon: gridOutlineAnimation
    }
  },
  {
    path: "/icon-buttons",
    meta: {
      title: "IconButtons",
      animationIcon: addCircleAnimation
    }
  },
  {
    path: "/tags",
    meta: {
      title: "Tags",
      animationIcon: documentAnimation,
    }
  },
  {
    path: "/form",
    meta: {
      title: "Form",
      animationIcon: documentationAnimation
    }
  },
  {
    path: "/date-picker",
    meta: {
      title: "Date Picker",
      animationIcon: settingsAnimation
    }
  },
  {
    path: "/table",
    meta: {
      title: "Table",
      animationIcon: gridAnimation
    }
  },
  {
    path: "/tabs",
    meta: {
      title: "Tabs",
      animationIcon: sidebarAnimation
    }
  },
  {
    path: "/inputs-default",
    meta: {
      title: "Inputs",
      animationIcon: input1Animation
    }
  },
  {
    path: "/inputs-inside",
    meta: {
      title: "Inputs (inside)",
      animationIcon: input1Animation
    }
  },
  {
    path: "/selects-default",
    meta: {
      title: "Select",
      animationIcon: sortAnimation
    }
  },
  {
    path: "/skeleton",
    meta: {
      title: "Skeleton",
      animationIcon: gridOutlineAnimation
    }
  },
  {
    path: "/textarea",
    meta: {
      title: "Textarea",
      animationIcon: documentAnimation
    }
  },
  {
    path: "/links",
    meta: {
      title: "UILink",
      animationIcon: twoArrowOutlineAnimation
    }
  },
  {
    path: "/checkbox",
    meta: {
      title: "Checkbox",
      animationIcon: addCircleAnimation
    }
  },
  {
    path: "/radio",
    meta: {
      title: "Radio",
      animationIcon: settingsAnimation
    }
  },
  {
    path: "/languages",
    meta: {
      title: "Languages",
      animationIcon: languageAnimation
    }
  },
  {
    path: "/collapse",
    meta: {
      title: "Collapse",
      animationIcon: menuInAnimation
    }
  },
  {
    path: "/block-title",
    meta: {
      title: "Block title",
      animationIcon: documentationAnimation
    }
  },
  {
    path: "/drag-and-drop",
    meta: {
      title: "Drag & Drop",
      animationIcon: newWindowsAnimation
    }
  },
  {
    path: "/chat",
    meta: {
      title: "Chat",
      animationIcon: support2Animation
    }
  },
  {
    path: "/gallery",
    meta: {
      title: "Gallery",
      animationIcon: gridAnimation
    }
  },
  {
    path: "/summary",
      meta: {
        title: "Summary",
          indicator: "2",
          animationIcon: dashboardAnimation,
          alwaysOpen: true
        // click: () => console.log(123),
        // class?: string;
        // isChildren?: boolean;
        // icon, iconActive - simple icon from uikit
        // iconComponent, iconComponentActive - if u need put icon not from uikit
        // isButton: true // Enable if you need the menu item to stop linking to a route
      },
    children: [
      {
        path: "/summary/notification",
        meta: {
          title: "Notification",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
      {
        path: "/summary/tooltip",
        meta: {
          title: "Tooltip",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
      {
        path: "/summary/confirm",
        meta: {
          title: "Confirm",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
      {
        path: "/summary/dropdown",
        meta: {
          title: "Dropdown",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
      {
        path: "/summary/modal",
        meta: {
          title: "Modal",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
      {
        path: "/summary/drawer",
        meta: {
          title: "Drawer",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
      {
        path: "/summary/avatar",
        meta: {
          title: "Avatar",
          icon: "add  1",
          iconActive: "add",
          isChildren: true // required for every child
        }
      },
    ]
  },
]);

export const menuItems = ref<ProfileMenuItem[][]>([
  [
    {
      name: "telegram",
      animationIcon: telegramAnimation,
      label: "Connect Telegram"
    },
    {
      name: "email",

      label: "Verify email",
      iconType: "filled",
      iconColor: "var(--color-icon-warning)",
      iconName: "mail"
    },
    {
      name: "secutity",
      animationIcon: securityAnimation,
      label: "Security",
      action: () => console.log("hello"),
      isActive: true
    },
    {
      name: "kyc",
      animationIcon: kycAnimation,
      label: "KYC Required",
      action: () => console.log("hello")
    }
  ],
  [
    {
      name: "notifications",
      animationIcon: notificationsAnimation,
      label: "Notification settings",
      action: () => console.log("hello")
    },
    {
      name: "settings",
      animationIcon: settingsAnimation,
      label: "Settings",
      action: () => console.log("hello")
    },
    {
      name: "language",
      animationIcon: languageAnimation,
      label: "Russian",
      action: () => console.log("hello")
    }
  ],
  [
    {
      name: "login",
      animationIcon: loginAnimation,
      label: "Log out",
      action: () => console.log("hello")
    }
  ]
]);
