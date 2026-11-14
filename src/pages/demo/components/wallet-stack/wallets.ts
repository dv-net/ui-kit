export type WalletItem = {
  id: string;
  label: string;
  icon: string;
};

export const wallets: WalletItem[] = [
  { id: "card", label: "Card", icon: "credit-card" },
  { id: "wallet", label: "Wallet", icon: "account-balance_wallet  2" },
  { id: "cash", label: "Cash", icon: "payments  2" }
];
