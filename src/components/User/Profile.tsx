import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { ImageUp, Save } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AddressForm from "./AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import UserInfo from "./UserInfo";

interface ProfileProps {
  getUserById: () => Promise<any>;
  updateUser: (data: any) => Promise<any>;
  isLoading: boolean; 
}

const Profile = ({ getUserById, updateUser, isLoading }: ProfileProps) => {
  const [openGender, setOpenGender] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [gender, setGender] = useState("");
  const [payment, setPayment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addresses: [
      {
        id: "",
        street: "",
        district: "",
        ward: "",
        city: "",
        country: "",
      },
    ],
    avatar: "",
  });

  // Update fetchUserData
  const fetchUserData = async () => {
    const userData = await getUserById();
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        addresses: userData.addresses || [
          {
            street: "",
            district: "",
            ward: "",
            city: "",
            country: "",
          },
        ],
        avatar: userData.avatar || "",
      });
      setGender(userData.gender || "");
      setPayment(userData.paymentMethod || "");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Remove handleAvatarUrlSubmit function and modify handleSubmit
  const handleSubmit = async () => {
    const addressData = formData.addresses[0];
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender,
      paymentMethod: payment,
      avatar: avatarUrl || formData.avatar, // Add avatar to update data
      addresses: {
        upsert: {
          where: { id: addressData?.id || "0" },
          update: {
            street: addressData.street,
            district: addressData.district,
            ward: addressData.ward,
            city: addressData.city,
            country: addressData.country,
          },
          create: {
            street: addressData.street,
            district: addressData.district,
            ward: addressData.ward,
            city: addressData.city,
            country: addressData.country,
          },
        },
      },
    };

    try {
      await updateUser(updatedData);
      setIsEditing(false);
      setIsAvatarDialogOpen(false); // Close avatar dialog
      setFormData((prev) => ({
        ...prev,
        avatar: avatarUrl || prev.avatar, // Update local avatar state
      }));
      setAvatarUrl(""); // Reset avatar URL input
      toast({
        title: "Success",
        description: "Profile updated successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (addressData: { create?: any; update?: any }) => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        {
          ...(addressData.create || addressData.update),
          country: "Vietnam",
        },
      ],
    }));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleAvatarUrlSubmit = async () => {
    try {
      await updateUser({ avatar: avatarUrl });
      setFormData((prev) => ({
        ...prev,
        avatar: avatarUrl,
      }));
      setIsAvatarDialogOpen(false);
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="relative mx-auto w-48 h-48">
              <Skeleton className="w-48 h-48 rounded-full" />
            </div>
          </div>

          <div className="lg:w-2/3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="col-span-full space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full md:col-span-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Dialog
            open={isAvatarDialogOpen}
            onOpenChange={setIsAvatarDialogOpen}
          >
            <DialogTrigger asChild>
              <div className="relative mx-auto w-48 h-48 overflow-hidden rounded-full group cursor-pointer">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={formData.avatar}
                    alt="Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {formData.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <ImageUp className="text-white w-6 h-6" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile Picture</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    placeholder="Enter image URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAvatarUrlSubmit} disabled={!avatarUrl}>
                    Update Picture
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Click to change profile picture
          </p>
        </div>

        <div className="lg:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UserInfo
              formData={formData}
              gender={gender}
              payment={payment}
              isEditing={isEditing}
              openGender={openGender}
              openPayment={openPayment}
              setOpenGender={setOpenGender}
              setOpenPayment={setOpenPayment}
              setGender={setGender}
              setPayment={setPayment}
              handleInputChange={handleInputChange}
            />
            <div className="col-span-full space-y-4">
              <AddressForm
                address={{
                  id: formData.addresses[0]?.id,
                  street: formData.addresses[0]?.street || "",
                  district: formData.addresses[0]?.district || "",
                  ward: formData.addresses[0]?.ward || "",
                  city: formData.addresses[0]?.city || "",
                  country: formData.addresses[0]?.country || "Vietnam",
                }}
                isEditing={isEditing}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
