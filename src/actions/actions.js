import prisma from "@/lib/db";

export async function AddItem(formData) {
    // Retrieve the new item name from the formData
    const newItem = formData.get("newItem");

    try {
        // Check if newItem has a valid input
        if (!newItem) {
            return new Response(JSON.stringify({ message: "Item name is required." }), {
                status: 400,
            });
        }

        // Create the new item in the database using Prisma
        await prisma.item.create({
            data: {
                name: newItem, // Assuming the field name in your Prisma schema is 'name'
            },
        });

        // Return success response
        return new Response(JSON.stringify({ message: "Item added successfully." }), {
            status: 200,
        });
    } catch (error) {
        console.error("AddItem Error:", error);
        // Return error response
        return new Response(JSON.stringify({ message: "Error adding item." }), {
            status: 500,
        });
    }
}
