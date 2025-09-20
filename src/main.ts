import './style.css';
import webGPULogo from './webgpu.svg';
import hfLogo from './hf-logo.svg';
import { setupTranslator } from './translator.ts';

document.querySelector<HTMLDivElement>( '#app' )!.innerHTML = `
  <div>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API" target="_blank">
      <img src="${webGPULogo}" class="logo" alt="WebGPU logo" />
    </a>
    <a href="https://huggingface.co/docs/transformers.js/index" target="_blank">
      <img src="${hfLogo}" class="logo vanilla" alt="Huggingface logo" />
    </a>
        <p class="read-the-docs">
      Click on the logos to learn more
    </p>
    <h1>WebGPU + AI</h1>

    <div class="card">
      <button id="translator" type="button">Start translation</button>
    </div>

    <div class="card">
      <textarea id="input" rows="4" cols="50">Hello, how are you?</textarea>
    </div>

  </div>
`;

setupTranslator( document.querySelector<HTMLButtonElement>( '#input' )! );
