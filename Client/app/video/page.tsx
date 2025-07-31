"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function GenerateVideo() {
  const [inputvalue, setInputValue] = useState("");
  const [loading, setloading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const [apiResponse, setApiResponse] = useState(null);

  const VideoGenerator = async () => {
    try {
      setloading(true);
      const response = await fetch("http://localhost:8000/video-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputvalue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Video generation response:", data);

      // Store the API response
      setApiResponse(data);

      if (response.ok) {
        setVideoUrl(data.video);
      } else {
        setApiResponse(data.error || "Failed to generate video");
      }
    } catch (error) {
      console.error("Error in video generation:", error);
      setApiResponse({ error: error.message });
    }
    setloading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">Video Generator</h1>

        <Textarea
          placeholder="Enter your video prompt here"
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
          className="min-h-[100px]"
        />

        <Button
          onClick={VideoGenerator}
          disabled={loading || !inputvalue.trim()}
          className="w-full"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : null}
          {loading ? "Generating Video..." : "Generate Video"}
        </Button>
      </div>

      {/* API Response Display */}
      {apiResponse && (
        <div className="w-full max-w-2xl bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">API Response:</h2>
          <pre className="text-sm overflow-auto max-h-40 bg-white p-3 rounded border">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}

      {/* Video Player */}
      {videoUrl && (
        <div className="w-full max-w-4xl">
          <h2 className="text-lg font-semibold mb-2">Generated Video:</h2>
          <video
            className="w-full h-auto rounded-lg shadow-lg"
            controls
            autoPlay={false}
            preload="metadata"
            width="600"
            style={{ marginTop: 20, borderRadius: 8 }}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-gray-600 mt-2">Video URL: {videoUrl}</p>
        </div>
      )}

      {!videoUrl && !loading && apiResponse && (
        <div className="w-full max-w-2xl text-center">
          <p className="text-gray-600">
            No video URL found in the API response. Check the response structure
            above.
          </p>
        </div>
      )}
    </div>
  );
}
