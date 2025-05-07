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

interface Option {
  value: string;
  label: string;
}

interface UserInfoProps {
  formData: { name: string; email: string; phone: string };
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

const genders: Option[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const payments: Option[] = [
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
  const renderInput = (
    label: string,
    name: keyof typeof formData,
    type: string = "text",
    disabled = false
  ) => (
    <div className="space-y-2">
      <Label className={isEditing ? "" : "text-sm text-muted-foreground"}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={disabled ? "p-2 border rounded-md bg-muted" : ""}
        disabled={disabled}
      />
    </div>
  );

  const renderReadonlyInput = (label: string, value: string) => (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <Input
        value={value || "Not specified"}
        className="p-2 border rounded-md bg-muted"
        disabled
      />
    </div>
  );

  const renderSelectPopover = (
    label: string,
    value: string,
    options: Option[],
    open: boolean,
    setOpen: (v: boolean) => void,
    setValue: (v: string) => void
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {options.find((o) => o.value === value)?.label || `Select ${label.toLowerCase()}`}
            <ChevronsUpDown className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => {
                      setValue(item.value);
                      setOpen(false);
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
  );

  if (!isEditing) {
    return (
      <>
        {renderInput("Full Name", "name", "text", true)}
        {renderInput("Email", "email", "email", true)}
        {renderInput("Phone Number", "phone", "tel", true)}
        {renderReadonlyInput("Gender", genders.find((g) => g.value === gender)?.label || "")}
        {renderReadonlyInput("Preferred Payment", payment)}
      </>
    );
  }

  return (
    <>
      {renderInput("Full Name", "name")}
      {renderInput("Email", "email", "email", true)}
      {renderInput("Phone Number", "phone", "tel")}
      {renderSelectPopover("Gender", gender, genders, openGender, setOpenGender, setGender)}
      {renderSelectPopover("Preferred Payment", payment, payments, openPayment, setOpenPayment, setPayment)}
    </>
  );
};

export default UserInfo;
