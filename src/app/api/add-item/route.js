import prisma from "@/lib/db";

export async function POST(req) {
    try {
        // Parse the JSON body from the request
        const { newItem, category } = await req.json();

        // Validate input
        if (!newItem || typeof newItem !== "string") {
            return new Response(JSON.stringify({ message: "Invalid item name provided." }), {
                status: 400,
            });
        }

        // Save the new item to the database using Prisma
        const item = await prisma.item.create({
            data: {
                name: newItem, // Ensure this matches your Prisma schema field name
                category: category
            },
        });

        // Respond with success and the newly created item
        return new Response(JSON.stringify({ message: "Item added successfully.", item }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error in AddItem API:", error);

        // Respond with an error message in case of failure
        return new Response(JSON.stringify({ message: "Failed to add item." }), {
            status: 500,
        });
    }
}