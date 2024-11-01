import prisma from "@/lib/db";

export async function DELETE(req) {
    try {
        // Parse the JSON body from the request to get the item ID
        const { id } = await req.json();

        // Validate that an ID is provided
        if (!id) {
            return new Response(JSON.stringify({ message: "Item ID is required." }), {
                status: 400,
            });
        }

        // Delete the item from the database
        await prisma.item.delete({
            where: {
                id: id, // Ensure this matches the ID field in your Prisma schema
            },
        });

        // Return success response
        return new Response(JSON.stringify({ message: "Item deleted successfully." }), {
            status: 200,
        });
    } catch (error) {
        console.error("DeleteItem Error:", error);

        // Return error response
        return new Response(JSON.stringify({ message: "Failed to delete item." }), {
            status: 500,
        });
    }
}
