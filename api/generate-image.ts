import express from "express";
import dotenv from "dotenv";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express()

app.use(cors());
app.use(express.json())

app.post("/api/generate-image", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await fetch(
            "https://ai.hackclub.com/proxy/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "google/gemini-2.5-flash-image",
                    messages: [{ role: "user", content: prompt }],
                }),
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("AI API error:", text);
            return res.status(500).json({ error: "AI API failed" });
        }

        const result = await response.json();

        const imageDataUrl =
            result.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (!imageDataUrl) {
            console.error("No image returned:", result);
            return res.status(500).json({ error: "No image returned" });
        }

        const base64 = imageDataUrl.replace(
            /^data:image\/\w+;base64,/,
            ""
        );

        const resized = await sharp(Buffer.from(base64, "base64"))
            .resize(250, 250, { fit: "cover" })
            .png()
            .toBuffer();

        res.setHeader("Content-Type", "image/png");
        res.send(resized);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Image generation failed" });
    }
});

const clientDistPath = path.join(__dirname, "../dist");
app.use(express.static(clientDistPath));

// React router fallback
app.get("*", (_, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
