const fs = require('fs');

async function test() {
  const formData = new FormData();
  
  // We need a tiny valid wav file. We can just pass package.json for now, it'll probably fail with "invalid audio format" instead of "error parsing body" or "400 Bad Request" if the fields are right.
  const blob = new Blob([fs.readFileSync('package.json')]);
  formData.append('file', blob, 'test.wav');
  formData.append('model', 'saarika:v2');
  formData.append('language_code', 'en-IN');

  console.log("Sending request...");
  try {
    const res = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        "api-subscription-key": "sk_dk88qth5_RpwIsfl1poOhiFVWfImdRAmv",
      },
      body: formData
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

test();
