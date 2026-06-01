export async function POST(req) {
  try {
    const body = await req.json();

    const { relationship, text } = body;

    // Validation
    if (!relationship || !text) {
      return Response.json(
        {
          success: false,
          message: "البيانات ناقصة",
        },
        { status: 400 },
      );
    }

    // هنا بعدين هنضرب n8n webhook
    // حاليا mock response

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        relationship,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error("n8n webhook failed");
    }

    const raw = await response.text();

    console.log("N8N RAW RESPONSE:", raw);

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
        message: "حصل خطأ أثناء التحليل",
      },
      { status: 500 },
    );
  }
}
