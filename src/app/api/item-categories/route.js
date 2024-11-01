import prisma from "@/lib/db"
export async function GET() {
    try {
        const categories = await prisma.item.findMany({
            select: {
                category: true
            }
        })

        if (!categories) {
            return new Response(JSON.stringify({ error: "No categories available" }), {
                status: 400
            })
        }

        return new Response(JSON.stringify({ categories: categories }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        })
    }
    catch (error) {
        return new Response(JSON.stringify({ error: "Error fetching item categories." }), {
            status: 500
        })
    }
}