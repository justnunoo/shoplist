import prisma from "@/lib/db";

export async function GET() {
    try {
        const items = await prisma.item.findMany()

        if (!items) {
            return new Response(JSON.stringify({ message: "No item in the list" }), { status: 200 })
        }

        return new Response(JSON.stringify({ message: "Items fetched successfully", items }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        })
    }
    catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching items" }), { status: 500 })
    }
}