export async function POST(req) {
    try {
        const body = await req.json();

        const { variant, result } = body;

        if (!variant || !result) {
            return Response.json(
                {
                    success: false,
                    message: "البيانات ناقصة",
                },
                { status: 400 }
            );
        }

        const response = await fetch(process.env.N8N_REPLY_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variant,
                result,
            }),
        });

        if (!response.ok) {
            throw new Error("n8n reply webhook failed");
        }

        const raw = await response.text();
        const parsed = JSON.parse(raw);

        const data = Array.isArray(parsed) ? parsed[0] : parsed.data ?? parsed;

        return Response.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "حصل خطأ أثناء تجهيز الرد",
            },
            { status: 500 }
        );
    }
}