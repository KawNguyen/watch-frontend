import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

function AboutUs() {
    const teamMembers = [
        {
            name: "Trần Hải Lộc",
            role: "CEO & Founder",
            image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            bio: "He leads our technology team with expertise in AI and cloud architecture.",
        },
        {
            name: "Nguyễn Ngọc Đăng Khoa",
            role: "Design Director",
            image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            bio: "He brings creativity and user-centered design principles to all our products.",
        },
        {
            name: "Đặng Hoài An",
            role: "Marketing Lead",
            image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            bio: "He specializes in digital marketing strategies and brand development.",
        },
    ]

    return (
        <section id="about" className="pt-32 bg-white w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        About Us
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Time Never Looked This Good.
                    </p>
                </div>

                {/* Our Story */}
                <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Story
                        </h3>
                        <p className="text-gray-600 mb-4">
                            The journey of our brand started with a passion for timeless elegance and unmatched precision. Since day one, we've committed to crafting watches that are not only functional but also reflect the personality and taste of their wearers.
                        </p>
                        <p className="text-gray-600">
                            Our team brings together tradition and technology, aiming to redefine how people view time — not just as a measurement, but as a statement.
                        </p>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md aspect-[16/9]">
                        <img
                            src="https://tnktravel.com.vn/wp-content/uploads/2023/05/Team-Work-l%C3%A0-g%C3%AC--1024x536.jpeg"
                            alt="Team collaboration"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Our Values */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Our Values
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Innovation",
                                description:
                                    "We constantly push boundaries and explore new technologies to stay ahead of the curve.",
                            },
                            {
                                title: "Collaboration",
                                description:
                                    "We believe great ideas come from diverse teams working together toward a common goal.",
                            },
                            {
                                title: "Integrity",
                                description:
                                    "We're committed to transparency, honesty, and doing what's right for our clients and community.",
                            },
                        ].map((value, index) => (
                            <Card key={index} className="bg-gray-50 shadow-sm border">
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl mb-2">
                                        {value.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-base">
                                        {value.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Our Team */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Our Team
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="overflow-hidden border shadow-sm">
                                <div className="aspect-square w-full">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <CardTitle className="text-lg">{member.name}</CardTitle>
                                    <p className="text-blue-600 mb-2">{member.role}</p>
                                    <CardDescription className="text-gray-600 text-sm">
                                        {member.bio}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AboutUs
