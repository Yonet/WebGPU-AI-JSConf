import { pipeline, TranslationPipeline, type TranslationOutput } from '@huggingface/transformers';
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
const translator = await pipeline( 'translation', 'Xenova/nllb-200-distilled-600M' );

// [{ translation_text: 'La vie est comme une boîte à chocolat.' }]

export function setupTranslator ( element: HTMLTextAreaElement, outputField: HTMLTextAreaElement ) {
    let text = '';
    let outputText = '';

    // Recognition event handlers
    recognition.onerror = ( event ) => {
        element.textContent = `Error occurred in recognition: ${event.error}`;
    };

    recognition.onnomatch = ( event ) => {
        element.textContent = "I didn't recognize that color.";
    };



    const startTranslation = ( text: string ) => {
        console.log( 'Translating:', text );
        recognition.start();
        recognition.onresult = async ( event ) => {
            for ( let i = 0; i < event.results.length; i++ ) {
                const transcript = event.results[i][0].transcript;
                // console.log( transcript );
                text += transcript + '. ';
            }
            element.innerHTML = `Translating: ${text}`;
            const output: TranslationOutput = await translator( text, {
                src_lang: 'eng_Latn',
                tgt_lang: 'fra_Latn'
            } );
            outputText = output[0].translation_text;
            text = '';
            outputField.innerHTML = `Translation: ${outputText}`;
        };
    };


    element.addEventListener( 'click', () => startTranslation( text ) );
    startTranslation( text );
}
