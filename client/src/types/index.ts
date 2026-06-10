export interface Review {
  _id: string;
  name?: string;           // private — only in admin responses
  display_name: string;
  label: string;
  location: string;
  email?: string;          // private
  phone?: string;          // private
  rating: number;
  text: string;
  owner_reply: string;
  status: 'pending' | 'approved';
  featured: boolean;
  date_submitted: string;
  date_approved: string | null;
}

export interface ReviewStats {
  count: number;
  avg: number;
}

export interface FormResponse {
  success?: boolean;
  type?: string;
  errors?: string[];
  error?: string;
}

export interface AdminStatus {
  setup: boolean;
}

export interface QuoteFormData {
  nume: string;
  telefon: string;
  email: string;
  fax: string;
  destinatia_sistemului: string;
  destinatia_imobilului: string;
  piscina: string;
  nr_persoane: string;
  suprafata: string;
  orientare_acoperis: string;
  tip_acoperis: string;
  material_acoperis: string;
  distanta: string;
  sistem_backup: string;
  judet: string;
  adresa: string;
  info_suplimentare: string;
  website: string; // honeypot
}
