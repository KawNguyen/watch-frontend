import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserInfoProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  gender: string;
  payment: string;
  isEditing: boolean;
  openGender: boolean;
  openPayment: boolean;
  setOpenGender: (open: boolean) => void;
  setOpenPayment: (open: boolean) => void;
  setGender: (gender: string) => void;
  setPayment: (payment: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const genders = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const payments = [
  { value: "COD", label: "COD" },
  { value: "MOMO", label: "MOMO" },
];

const UserInfo = ({
  formData,
  gender,
  payment,
  isEditing,
  openGender,
  openPayment,
  setOpenGender,
  setOpenPayment,
  setGender,
  setPayment,
  handleInputChange,
}: UserInfoProps) => {
  if (!isEditing) {
    return (
      <>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Full Name</Label>
          <div className="p-2 border rounded-md bg-muted">{formData.name}</div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Email</Label>
          <div className="p-2 border rounded-md bg-muted">{formData.email}</div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Phone Number</Label>
          <div className="p-2 border rounded-md bg-muted">{formData.phone}</div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Gender</Label>
          <div className="p-2 border rounded-md bg-muted">
            {genders.find((g) => g.value === gender)?.label || "Not specified"}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Preferred Payment
          </Label>
          <div className="p-2 border rounded-md bg-muted">
            {payment || "Not specified"}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
        />
      </div>
      <div className="space-y-2">
        <Label>Gender</Label>
        <Popover open={openGender} onOpenChange={setOpenGender}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {genders.find((g) => g.value === gender)?.label ||
                "Select gender"}
              <ChevronsUpDown className="w-4 h-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {genders.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        setGender(item.value);
                        setOpenGender(false);
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label>Preferred Payment</Label>
        <Popover open={openPayment} onOpenChange={setOpenPayment}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {payment || "Select payment method"}
              <ChevronsUpDown className="w-4 h-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {payments.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        setPayment(item.label);
                        setOpenPayment(false);
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default UserInfo;
