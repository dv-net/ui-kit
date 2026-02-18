import BlockTitle from "@/pages/block-title/BlockTitle.vue";
import Test1 from "@/pages/block-title/pages/Test1View.vue";
import Test2 from "@/pages/block-title/pages/Test2View.vue";
import Test3 from "@/pages/block-title/pages/Test3View.vue";
import Buttons from "@/pages/buttons/ButtonsView.vue";
import Checkbox from "@/pages/checkbox/CheckboxView.vue";
import Collapse from "@/pages/collapse/CollapseView.vue";
import Confirm from "@/pages/confirm/ConfirmView.vue";
import DatePicker from "@/pages/date-picker/DatePickerView.vue";
import DragAndDrop from "@/pages/dragAndDrop/DragAndDropView.vue";
import Drawer from "@/pages/drawer/DrawerView.vue";
import Dropdown from "@/pages/dropdown/DropdownView.vue";
import Form from "@/pages/form/FormView.vue";
import Home from "@/pages/HomeView.vue";
import IconButtons from "@/pages/icon-buttons/IconButtonsView.vue";
import Icons from "@/pages/icons/IconsView.vue";
import InputsDefault from "@/pages/inputs/InputsDefault.vue";
import InputsInside from "@/pages/inputs/InputsInside.vue";
import Languages from "@/pages/languages/LanguagesView.vue";
import Notification from "@/pages/notification/NotificationView.vue";
import Radio from "@/pages/radio/RadioView.vue";
import Selects from "@/pages/selects/SelectsView.vue";
import Skeleton from "@/pages/skeleton/SkeletonView.vue";
import Summary from "@/pages/summary/SummaryView.vue";
import Table from "@/pages/table/TableView.vue";
import Tabs from "@/pages/tabs/TabsView.vue";
import Tags from "@/pages/tags/TagsView.vue";
import Textarea from "@/pages/textarea/TextareaView.vue";
import Tooltip from "@/pages/tooltip/TooltipView.vue";
import UiAvatar from "@/pages/ui-avatar/UiAvatarView.vue";
import UiLink from "@/pages/ui-link/UiLinkView.vue";
import UiModal from "@/pages/ui-modal/UiModalView.vue";
import Chat from "@/pages/chat/ChatView.vue";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  {
    path: "/block-title",
    component: BlockTitle,
    redirect: "/test1",
    children: [
      { path: "/test1", component: Test1 },
      { path: "/test2", component: Test2 },
      { path: "/test3", component: Test3 }
    ]
  },
  { path: "/skeleton", component: Skeleton },
  { path: "/inputs-default", component: InputsDefault },
  { path: "/inputs-inside", component: InputsInside },
  { path: "/selects-default", component: Selects },
  { path: "/buttons", component: Buttons },
  { path: "/textarea", component: Textarea },
  { path: "/links", component: UiLink },
  { path: "/checkbox", component: Checkbox },
  { path: "/radio", component: Radio },
  { path: "/icon-buttons", component: IconButtons },
  { path: "/tags", component: Tags },
  { path: "/tabs", component: Tabs },
  { path: "/collapse", component: Collapse },
  { path: "/drag-and-drop", component: DragAndDrop },
  { path: "/form", component: Form },
  { path: "/icons", component: Icons },
  { path: "/form", component: Form },
  { path: "/table", component: Table },
  { path: "/date-picker", component: DatePicker },
  { path: "/languages", component: Languages },
  { path: "/summary", component: Summary, redirect: () => "/summary/notification" },
  { path: "/summary/notification", component: Notification },
  { path: "/summary/tooltip", component: Tooltip },
  { path: "/summary/confirm", component: Confirm },
  { path: "/summary/dropdown", component: Dropdown },
  { path: "/summary/modal", component: UiModal },
  { path: "/summary/drawer", component: Drawer },
  { path: "/summary/avatar", component: UiAvatar },
  { path: "/chat", component: Chat },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
