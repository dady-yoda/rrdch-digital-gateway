import { pipeline, env } from '@xenova/transformers';

// We rely on the remote Hugging Face CDN for the models.
env.allowLocalModels = false;

let transcriber: any = null;

self.addEventListener('message', async (e) => {
  const { audio, language, action } = e.data;

  try {
    if (action === 'init' || (!transcriber && action === 'transcribe')) {
      transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small', {
        progress_callback: (progress: any) => {
          self.postMessage({ status: 'progress', progress });
        }
      });
      if (action === 'init') {
        self.postMessage({ status: 'ready' });
        return;
      }
    }

    if (action === 'transcribe') {
      self.postMessage({ status: 'processing' });
      
      const output = await transcriber(audio, {
        language: language === 'kn-IN' ? 'kannada' : 'english',
        task: 'transcribe',
      });

      self.postMessage({ status: 'result', text: output.text });
    }
  } catch (err) {
    self.postMessage({ status: 'error', error: err instanceof Error ? err.message : String(err) });
  }
});
