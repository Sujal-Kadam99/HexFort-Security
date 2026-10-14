export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string;
  description: string;
  deliverables: string[];
  price_inr: number | null;
  price_usd: number | null;
  pricing_mode: "fixed" | "quote";
  is_published: boolean;
  is_featured: boolean;
  created_at?: string;
};
