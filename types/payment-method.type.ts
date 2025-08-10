enum TYPE_PAYMENT {
  cash = "cash",
  bank_transfer = "bank_transfer",
}

export interface PaymentMethod {
  bank_name?: string;
  account_number?: string;
  account_holder?: string;
  bank_logo?: null;
  description?: string;
  name: string;
  type: TYPE_PAYMENT;
  __v: number;
  _id: string;
}
