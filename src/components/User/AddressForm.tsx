import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useVietnamLocations } from "@/hooks/useVietnamLocations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useCallback } from "react";

interface Address {
  id?: string;
  street: string;
  district: string;
  ward: string;
  city: string;
  country: string;
}

interface AddressFormProps {
  address: Address;
  isEditing: boolean;
  onChange: (data: { create?: Omit<Address, "id">; update?: Address }) => void;
}

const AddressForm = ({ address, isEditing, onChange }: AddressFormProps) => {
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useVietnamLocations();

  const updateAddress = useCallback(
    (partial: Partial<Address>) => {
      const updated = { ...address, ...partial };
      onChange(address.id ? { update: updated } : { create: updated });
    },
    [address, onChange],
  );

  useEffect(() => {
    const init = async () => {
      const province = provinces.find((p) => p.name === address.city);
      if (province) {
        await fetchDistricts(province.code);
        const district = districts.find((d) => d.name === address.district);
        if (district) await fetchWards(district.code);
      }
    };

    if (provinces.length) init();
  }, [provinces, address.city, address.district]);

  if (!isEditing) {
    const DisplayField = ({
      label,
      value,
    }: {
      label: string;
      value: string;
    }) => (
      <div>
        <Label className="text-sm">{label}</Label>
        <div className="p-2 border rounded-md bg-muted">
          {value || "Not specified"}
        </div>
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DisplayField label="Street" value={address.street} />
        <DisplayField label="City" value={address.city} />
        <DisplayField label="District" value={address.district} />
        <DisplayField label="Ward" value={address.ward} />
        <div className="md:col-span-2">
          <DisplayField label="Country" value={address.country} />
        </div>
      </div>
    );
  }

  const SelectField = ({
    label,
    placeholder,
    items,
    value,
    onChange,
    disabled,
  }: {
    label: string;
    placeholder: string;
    items: { code: number; name: string }[];
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
  }) => (
    <div>
      <Label className="text-sm">{label}</Label>
      <Select onValueChange={onChange} value={value} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.code} value={item.code.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm">Street</Label>
        <Input
          name="street"
          value={address.street}
          onChange={(e) => updateAddress({ street: e.target.value })}
          placeholder="Enter street"
        />
      </div>
      <SelectField
        label="City"
        placeholder="Select city"
        items={provinces}
        value={provinces.find((p) => p.name === address.city)?.code.toString()}
        onChange={(val) => {
          const province = provinces.find((p) => p.code.toString() === val);
          if (province) {
            fetchDistricts(province.code);
            updateAddress({ city: province.name, district: "", ward: "" });
          }
        }}
      />
      <SelectField
        label="District"
        placeholder="Select district"
        items={districts}
        disabled={!districts.length}
        value={districts
          .find((d) => d.name === address.district)
          ?.code.toString()}
        onChange={(val) => {
          const district = districts.find((d) => d.code.toString() === val);
          if (district) {
            fetchWards(district.code);
            updateAddress({ district: district.name, ward: "" });
          }
        }}
      />
      <SelectField
        label="Ward"
        placeholder="Select ward"
        items={wards}
        value={wards.find((w) => w.name === address.ward)?.code.toString()}
        onChange={(val) => {
          const ward = wards.find((w) => w.code.toString() === val);
          if (ward) updateAddress({ ward: ward.name });
        }}
      />
      <div className="md:col-span-2">
        <Label className="text-sm">Country</Label>
        <Input name="country" value="Vietnam" disabled />
      </div>
    </div>
  );
};

export default AddressForm;
