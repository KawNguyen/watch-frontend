import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [

    { month: "January", desktop: 135, mobile: 68, tablet: 82 },
    { month: "February", desktop: 112, mobile: 95, tablet: 74 },
    { month: "March", desktop: 142, mobile: 88, tablet: 67 },
    { month: "April", desktop: 97, mobile: 70, tablet: 91 },
    { month: "May", desktop: 123, mobile: 60, tablet: 85 },
    { month: "June", desktop: 108, mobile: 77, tablet: 79 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    tablet: {
        label: "Tablet",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig
function Dashboard() {
    return (
        <Card>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[800px]">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 10,
                            right: 10,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}

                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="var(--color-mobile)"
                            fillOpacity={0.4}
                            stroke="var(--color-mobile)"
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                        <Area
                            dataKey="tablet"
                            type="natural"
                            fill="#8b5cf6" // tím
                            fillOpacity={0.4}
                            stroke="#8b5cf6"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default Dashboard
