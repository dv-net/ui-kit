import { ref } from "vue";

import type { RouteItem } from "@/lib/components/UiLayoutMenu/types";
import { ProfileMenuItem } from "@/lib/components/UiProfileMenu/types";
import {
  dashboardAnimation,
  kycAnimation,
  languageAnimation,
  loginAnimation,
  notificationsAnimation,
  securityAnimation,
  settingsAnimation,
  telegramAnimation,
  toolsAnimation,
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
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/icon-buttons",
    meta: {
      title: "IconButtons",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/tags",
    meta: {
      title: "Tags",
      icon: "home",
      iconActive: "home",
    }
  },
  {
    path: "/form",
    meta: {
      title: "Form",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/date-picker",
    meta: {
      title: "Date Picker",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/table",
    meta: {
      title: "Table",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/tabs",
    meta: {
      title: "Tabs",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/inputs-default",
    meta: {
      title: "Inputs",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/inputs-inside",
    meta: {
      title: "Inputs (inside)",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/selects-default",
    meta: {
      title: "Select",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/skeleton",
    meta: {
      title: "Skeleton",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/textarea",
    meta: {
      title: "Textarea",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/links",
    meta: {
      title: "UILink",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/checkbox",
    meta: {
      title: "Checkbox",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/radio",
    meta: {
      title: "Radio",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/languages",
    meta: {
      title: "Languages",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/collapse",
    meta: {
      title: "Collapse",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/block-title",
    meta: {
      title: "Block title",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/drag-and-drop",
    meta: {
      title: "Drag & Drop",
      icon: "home",
      iconActive: "home"
    }
  },
  {
    path: "/chat",
    meta: {
      title: "Chat",
      icon: "home",
      iconActive: "home"
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
