const fs = require('fs');

async function testTTS() {
  const apiKey = "sk_dk88qth5_RpwIsfl1poOhiFVWfImdRAmv";
  const text = "ನಮಸ್ಕಾರ, ಡೆಂಟಿ ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?";
  
  console.log("Testing Sarvam TTS for Kannada...");
  
  try {
    const res = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: "kn-IN",
        speaker: "priya",
        pace: 1.0,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v3"
      })
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    if (res.status === 200 && data.audios && data.audios.length > 0) {
      console.log("Success! Audio data received.");
    } else {
      console.log("Error response:", JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

testTTS();
