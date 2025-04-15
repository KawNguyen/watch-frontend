import { ImageUp } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
]
const payments = [
    { value: "cod", label: "COD" },
    { value: "momo", label: "MOMO   " },
]
const Profile = () => {
    const [openGender, setOpenGender] = React.useState(false)
    const [openPayment, setOpenPayment] = React.useState(false)
    const [gender, setGender] = React.useState("")
    const [payment, setPayment] = React.useState("")

    return (
        <div className="container  lg:grid grid-cols-5 gap-x-10">
            <div className="relative mb-10 h-fit w-fit overflow-hidden rounded-full group">
                <img
                    src='data:image/png;base64,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'
                    alt="Avatar"
                    className="w-80 object-cover"
                />
                {/* <div className="absolute h-full w-full top-0 bg-[#292929a3] flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100">
                    <div className="p-2 text-white translate-y-full duration-500 group-hover:translate-y-0">
                        <ImageUp />
                    </div>
                </div> */}
            </div>
            <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="col-span-3">
                    <Label className='text-md'>Full name</Label>
                    <Input type='text' className='w-full' />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <Label className='text-md'>Gender</Label>
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
                                                    setGender(gender.label)
                                                    setOpenGender(false)
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
                <div className="col-span-3 md:col-span-2">
                    <Label className='text-md'>Email</Label>
                    <Input type='text' className='w-full' />
                </div>
                <div className="col-span-3 md:col-span-2">
                    <Label className='text-md'>Phone Number</Label>
                    <Input type='text' className='w-full' />
                </div>
                <div className="col-span-3 md:col-span-3">
                    <Label className='text-md'>Address</Label>
                    <Input type='text' className='w-full' />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <Label className='text-md'>Payment Method</Label>
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
                                                    setPayment(payments.label)
                                                    setOpenPayment(false)
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
            </div>
        </div>
    )
}

export default Profile