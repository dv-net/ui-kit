import { ComputedRef, nextTick, Ref, ref } from "vue";

const ITEM_SELECTOR = [
  "button:not(:disabled)",
  "a[href]",
  '[role="menuitem"]:not([aria-disabled="true"])',
  "[data-dropdown-item]"
].join(", ");

export function useKeyboard({
  isOpen,
  isDisabled,
  open,
  getRoot
}: {
  isOpen: Ref<boolean>;
  isDisabled: ComputedRef<boolean>;
  open: (preferEnd?: boolean) => void;
  getRoot: () => HTMLElement | null;
}) {
  const navigatedIndex = ref<number | null>(null);

  function getItems() {
    const root = getRoot();
    if (!root) {
      return [];
    }
    return Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter((item) => {
      return !item.hasAttribute("disabled") && item.getAttribute("aria-disabled") !== "true";
    });
  }

  function firstSelectableIndex() {
    return getItems().length ? 0 : null;
  }

  function lastSelectableIndex() {
    const count = getItems().length;
    return count ? count - 1 : null;
  }

  function applyHighlight() {
    const items = getItems();
    items.forEach((item, index) => {
      if (index === navigatedIndex.value) {
        item.setAttribute("data-highlighted", "true");
        item.classList.add("is-navigated");
      } else {
        item.removeAttribute("data-highlighted");
        item.classList.remove("is-navigated");
      }
    });
  }

  function clearHighlight() {
    getItems().forEach((item) => {
      item.removeAttribute("data-highlighted");
      item.classList.remove("is-navigated");
    });
    navigatedIndex.value = null;
  }

  async function scrollHighlightedIntoView() {
    await nextTick();
    applyHighlight();
    const item = getRoot()?.querySelector<HTMLElement>("[data-highlighted='true']");
    const container = item?.closest(".ui-dropdown__content");
    if (!(container instanceof HTMLElement) || !item) {
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - itemRect.top;
    } else if (itemRect.bottom > containerRect.bottom) {
      container.scrollTop += itemRect.bottom - containerRect.bottom;
    }
  }

  function moveHighlight(step: 1 | -1) {
    const items = getItems();
    if (!items.length) {
      return;
    }
    const position = navigatedIndex.value ?? -1;
    if (position === -1) {
      navigatedIndex.value = step > 0 ? 0 : items.length - 1;
      void scrollHighlightedIntoView();
      return;
    }
    const next = position + step;
    if (next < 0 || next >= items.length) {
      return;
    }
    navigatedIndex.value = next;
    void scrollHighlightedIntoView();
  }

  function confirmHighlighted() {
    if (navigatedIndex.value === null) {
      return;
    }
    const item = getItems()[navigatedIndex.value];
    item?.click();
  }

  function setInitialHighlight(preferEnd = false) {
    navigatedIndex.value = preferEnd ? lastSelectableIndex() : firstSelectableIndex();
    void scrollHighlightedIntoView();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (isDisabled.value) {
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter") {
      return;
    }

    if (!isOpen.value) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        open(event.key === "ArrowUp");
      } else if (event.key === "Enter") {
        event.preventDefault();
        open();
      }
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (event.key === "ArrowDown") {
      moveHighlight(1);
    } else if (event.key === "ArrowUp") {
      moveHighlight(-1);
    } else {
      confirmHighlighted();
    }
  }

  return {
    onKeydown,
    navigatedIndex,
    clearHighlight,
    setInitialHighlight
  };
}
