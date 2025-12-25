import {Layout} from "@/components/layout"
import { useState } from "react";

function App() {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState<string|null>(null)
    const [loading, setLoading] = useState(false);
    async function generateImage() {
        setLoading(true);
        setImageUrl(null);
        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });
            if (!response) {
                setLoading(false);
                alert("Failed to generate image!");
                return;
            }
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const data = await response.json
                console.error("API Error: ", data)
                alert("No image returned")
                return
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
            setLoading(false);
        }
        catch (err) {
            console.error(err)
            alert("Unexpected error")
        } finally {
            setLoading(false);
        }
    }
    return (
        <Layout
            prompt={prompt}
            setPrompt={setPrompt}
            generateImage={generateImage}
            loading={loading}
            imageUrl={imageUrl}
        />
    );
};

export default App;