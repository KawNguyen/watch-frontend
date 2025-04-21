import { Label } from "../ui/label";
import { Input } from "../ui/input";
("use client");

import * as React from "react";
import { ChevronsUpDown, ImageUp } from "lucide-react";

// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import {
  Command,
  // CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const payments = [
  { value: "cod", label: "COD" },
  { value: "momo", label: "MOMO   " },
];
const Profile = () => {
  const [openGender, setOpenGender] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [payment, setPayment] = React.useState("");

  return (
    <div className="container  lg:grid grid-cols-5 gap-x-10">
      <div className="relative mb-10 h-fit w-fit overflow-hidden rounded-full group mx-auto">
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="Avatar"
          className="w-80 object-cover"
        />
        <div className="absolute h-full w-full top-0 bg-[#292929a3] flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100">
          <div className="p-2 text-white translate-y-full duration-500 group-hover:translate-y-0">
            <ImageUp />
          </div>
        </div>
      </div>

      <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-2">
          <Label className="text-md">Full name</Label>
          <Input type="text" className="w-full" />
        </div>
        <div className="col-span-3 md:col-span-1">
          <Label className="text-md">Gender</Label>
          <Popover open={openGender} onOpenChange={setOpenGender}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {gender ? gender : "Select Gender"}
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                {/* <CommandInput placeholder="Find Gender" className="h-9" /> */}
                <CommandList>
                  {/* <CommandEmpty>Not Found</CommandEmpty> */}
                  <CommandGroup>
                    {genders.map((gender) => (
                      <CommandItem
                        key={gender.value}
                        onSelect={() => {
                          setGender(gender.label);
                          setOpenGender(false);
                        }}
                      >
                        {gender.label}
                        {/* <Check
                                                    className={cn(
                                                        "ml-2",
                                                        value === gender.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                /> */}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="col-span-3 md:col-span-1">
          <Label className="text-md">Payment Method</Label>
          <Popover open={openPayment} onOpenChange={setOpenPayment}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {payment ? payment : "Select Payment"}
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {payments.map((payments) => (
                      <CommandItem
                        key={payments.value}
                        onSelect={() => {
                          setPayment(payments.label);
                          setOpenPayment(false);
                        }}
                      >
                        {payments.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="col-span-3 md:col-span-2">
          <Label className="text-md">Email</Label>
          <Input type="text" className="w-full" />
        </div>
        <div className="col-span-3 md:col-span-2">
          <Label className="text-md">Phone Number</Label>
          <Input type="text" className="w-full" />
        </div>
        <div className="col-span-3 md:col-span-4">
          <Label className="text-md">Address</Label>
          <Input type="text" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
