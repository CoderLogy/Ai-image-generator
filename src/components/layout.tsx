import { Textarea } from "@/components/ui/textarea"
import { Background }  from "@/components/background"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Analytics } from "@vercel/analytics/next"

interface LayoutProps {
    prompt: string;
    setPrompt: (value: string) => void;
    generateImage: () => void;
    loading: boolean;
    imageUrl: string | null;
}

export function Layout({ prompt, setPrompt, generateImage, loading, imageUrl }: LayoutProps) {
    return (
        <Background>    
            <div className="flex justify-center items-center min-h-screen">
                <div className="relative mx-50">
                    {imageUrl ? (
                        <img src={imageUrl} width={250} height={250} className="mx-auto mb-10" />
                    ) : (
                        <Skeleton className="w-[250px] h-[250px] mx-auto mb-10" />
                    )}    
                    <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the image... " className="bg-gray-900 focus:bg-black  text-white resize-none min-w-[50vw] pr-14 pb-3 max-w-100 pl-3 pt-4"/>
                    <Button onClick={generateImage} disabled={loading} className="absolute right-3.5 bottom-4 hover:opacity-80" style={{ backgroundColor: "rgba(70, 130, 180, 1)" }}>
                        {loading ? (
                            <Spinner />
                        ) : (
                                < >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right-icon lucide-chevron-right"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                                    
                                </>
                        )}
                    </Button>
                </div>
            </div>
            <Analytics />
        </Background>
    )
}



