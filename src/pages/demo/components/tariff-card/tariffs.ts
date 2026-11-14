export type Tariff = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  unit: string;
  note: string;
};

export const tariffs: Tariff[] = [
  {
    id: "standard",
    title: "Standard",
    subtitle: "Basic",
    price: "2.50",
    unit: "/ GB",
    note: "Shared pool"
  },
  {
    id: "premium",
    title: "Premium",
    subtitle: "Fast",
    price: "4.00",
    unit: "/ GB",
    note: "Clean IPs"
  }
];
