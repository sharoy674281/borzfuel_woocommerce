"use client";

import Input from "@/components/ui/Input";
import type { WooAddress } from "@/types/woocommerce";

interface ShippingFormProps {
  address: WooAddress;
  onChange: (address: WooAddress) => void;
  errors: Partial<Record<keyof WooAddress, string>>;
}

export default function ShippingForm({
  address,
  onChange,
  errors,
}: ShippingFormProps) {
  const update = (field: keyof WooAddress, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fornavn"
          value={address.first_name}
          onChange={(e) => update("first_name", e.target.value)}
          error={errors.first_name}
          required
        />
        <Input
          label="Etternavn"
          value={address.last_name}
          onChange={(e) => update("last_name", e.target.value)}
          error={errors.last_name}
          required
        />
      </div>

      <Input
        label="E-post"
        type="email"
        value={address.email || ""}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Telefon"
        type="tel"
        value={address.phone || ""}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />

      <Input
        label="Adresse"
        value={address.address_1}
        onChange={(e) => update("address_1", e.target.value)}
        error={errors.address_1}
        required
      />

      <Input
        label="Leilighet, etasje, etc. (valgfritt)"
        value={address.address_2 || ""}
        onChange={(e) => update("address_2", e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="By"
          value={address.city}
          onChange={(e) => update("city", e.target.value)}
          error={errors.city}
          required
        />
        <Input
          label="Fylke"
          value={address.state}
          onChange={(e) => update("state", e.target.value)}
          error={errors.state}
          required
        />
        <Input
          label="Postnummer"
          value={address.postcode}
          onChange={(e) => update("postcode", e.target.value)}
          error={errors.postcode}
          required
        />
      </div>

      <Input
        label="Land"
        value={address.country}
        onChange={(e) => update("country", e.target.value)}
        error={errors.country}
        required
      />
    </div>
  );
}
