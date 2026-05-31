let cachedModelName = null;

async function getModelName(apiKey) {
    if (cachedModelName) return cachedModelName;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const data = await response.json();

    // Find first model that supports generateContent
    const model = data.models?.find(m =>
        m.supportedGenerationMethods?.includes("generateContent")
    );

    cachedModelName = model?.name || "models/gemini-1.5-flash-latest";
    return cachedModelName;
}

export async function getGeminiResponse(message) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    try {
        const modelName = await getModelName(API_KEY);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: message }] }]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);
            return "API Error: " + (data.error?.message || "Unknown error");
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received.";
    } catch (error) {
        console.error("Error details:", error);
        return "Sorry, there was an error. Please try again.";
    }
}
