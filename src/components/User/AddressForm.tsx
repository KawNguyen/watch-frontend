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
import { useEffect } from "react";

interface AddressFormProps {
  address: {
    id?: string;
    street: string;
    district: string;
    ward: string;
    city: string;
    country: string;
  };
  isEditing: boolean;
  onChange: (address: {
    create?: Omit<AddressFormProps['address'], 'id'>;
    update?: AddressFormProps['address'];
  }) => void;
}

const AddressForm = ({ address, isEditing, onChange }: AddressFormProps) => {
  const { provinces, districts, wards, fetchDistricts, fetchWards } = useVietnamLocations();

  useEffect(() => {
    const loadExistingLocation = async () => {
      if (address.city) {
        const province = provinces.find(p => p.name === address.city);
        if (province) {
          await fetchDistricts(province.code);
          if (address.district) {
            const district = districts.find(d => d.name === address.district);
            if (district) {
              await fetchWards(district.code);
            }
          }
        }
      }
    };

    if (provinces.length > 0) {
      loadExistingLocation();
    }
  }, [provinces]);

  const handleProvinceChange = (value: string) => {
    const province = provinces.find(p => p.code.toString() === value);
    if (province) {
      fetchDistricts(province.code);
      const updatedAddress = {
        ...address,
        city: province.name,
        district: "",
        ward: "",
      };
      
      onChange(address.id 
        ? { update: updatedAddress }
        : { create: updatedAddress }
      );
    }
  };

  const handleDistrictChange = (value: string) => {
    const district = districts.find(d => d.code.toString() === value);
    if (district) {
      fetchWards(district.code);
      const updatedAddress = {
        ...address,
        district: district.name,
        ward: "",
      };
      
      onChange(address.id 
        ? { update: updatedAddress }
        : { create: updatedAddress }
      );
    }
  };

  const handleWardChange = (value: string) => {
    const ward = wards.find(w => w.code.toString() === value);
    if (ward) {
      const updatedAddress = {
        ...address,
        ward: ward.name,
      };
      
      onChange(address.id 
        ? { update: updatedAddress }
        : { create: updatedAddress }
      );
    }
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAddress = {
      ...address,
      street: e.target.value,
    };
    
    onChange(address.id 
      ? { update: updatedAddress }
      : { create: updatedAddress }
    );
  };

  if (!isEditing) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Street</Label>
          <div className="p-2 border rounded-md bg-muted">{address.street}</div>
        </div>
        <div>
          <Label className="text-sm">City</Label>
          <div className="p-2 border rounded-md bg-muted">{address.city}</div>
        </div>
        <div>
          <Label className="text-sm">District</Label>
          <div className="p-2 border rounded-md bg-muted">{address.district}</div>
        </div>
        <div>
          <Label className="text-sm">Ward</Label>
          <div className="p-2 border rounded-md bg-muted">{address.ward}</div>
        </div>
        <div className="md:col-span-2">
          <Label className="text-sm">Country</Label>
          <div className="p-2 border rounded-md bg-muted">{address.country}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm">Street</Label>
        <Input
          name="street"
          value={address.street}
          onChange={handleStreetChange}
          placeholder="Enter street"
        />
      </div>
      <div>
        <Label className="text-sm">City</Label>
        <Select 
          onValueChange={handleProvinceChange}
          value={provinces.find(p => p.name === address.city)?.code.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select city">
              {address.city || "Select city"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.code} value={province.code.toString()}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm">District</Label>
        <Select 
          onValueChange={handleDistrictChange}
          disabled={!districts.length}
          value={districts.find(d => d.name === address.district)?.code.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select district">
              {address.district || "Select district"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.code} value={district.code.toString()}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm">Ward</Label>
        <Select 
          onValueChange={handleWardChange}
          value={wards.find(w => w.name === address.ward)?.code.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ward">
              {address.ward || "Select ward"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward.code} value={ward.code.toString()}>
                {ward.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Label className="text-sm">Country</Label>
        <Input
          name="country"
          value="Vietnam"
          disabled
          placeholder="Vietnam"
        />
      </div>
    </div>
  );
};

export default AddressForm;