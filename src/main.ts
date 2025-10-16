import './style.css';
import { setupTranslator } from './translator.ts';

setupTranslator(
  document.querySelector<HTMLTextAreaElement>( '#input' )!,
  document.querySelector<HTMLTextAreaElement>( '#cpu-output' )!,
  document.querySelector<HTMLTextAreaElement>( '#cloud-output' )!,
  document.querySelector<HTMLButtonElement>( '#translator' )!,
  document.querySelector<HTMLSpanElement>( '#cpu-speed' )!,
  document.querySelector<HTMLSpanElement>( '#cloud-speed' )!
);
