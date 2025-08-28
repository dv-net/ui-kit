export interface menuProvide {
  onMenuItemSelect: () => void
}

export const menuProvideDefault: menuProvide = {
  onMenuItemSelect: () => {}
}