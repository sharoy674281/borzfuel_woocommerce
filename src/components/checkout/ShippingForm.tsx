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
          label="First Name"
          value={address.first_name}
          onChange={(e) => update("first_name", e.target.value)}
          error={errors.first_name}
          required
        />
        <Input
          label="Last Name"
          value={address.last_name}
          onChange={(e) => update("last_name", e.target.value)}
          error={errors.last_name}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={address.email || ""}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Phone"
        type="tel"
        value={address.phone || ""}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />

      <Input
        label="Address"
        value={address.address_1}
        onChange={(e) => update("address_1", e.target.value)}
        error={errors.address_1}
        required
      />

      <Input
        label="Apartment, suite, etc. (optional)"
        value={address.address_2 || ""}
        onChange={(e) => update("address_2", e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="City"
          value={address.city}
          onChange={(e) => update("city", e.target.value)}
          error={errors.city}
          required
        />
        <Input
          label="State"
          value={address.state}
          onChange={(e) => update("state", e.target.value)}
          error={errors.state}
          required
        />
        <Input
          label="ZIP Code"
          value={address.postcode}
          onChange={(e) => update("postcode", e.target.value)}
          error={errors.postcode}
          required
        />
      </div>

      <Input
        label="Country"
        value={address.country}
        onChange={(e) => update("country", e.target.value)}
        error={errors.country}
        required
      />
    </div>
  );
}
