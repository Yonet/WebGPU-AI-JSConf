
import { pipeline, TranslationPipeline, type TranslationOutput } from '@huggingface/transformers';

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const apiKey = "AIzaSyAgBR3wDQMfE58aUc-Gtq5bEPNVv-qPXbo";

async function translateWithCloud ( text: string, targetLanguage: string ): Promise<string> {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch( url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
            q: text,
            target: targetLanguage,
        } ),
    } );

    if ( !response.ok ) {
        throw new Error( `HTTP error! status: ${response.status}` );
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

const translator = await pipeline(
    'translation',
    'Xenova/nllb-200-distilled-600M',

);

async function translateWithCPU ( text: string ): Promise<string> {
    const output: TranslationOutput = await translator( text, {
        src_lang: 'eng_Latn',
        tgt_lang: 'ita_Latn'
    } );
    console.log( output[0].translation_text );
    return output[0].translation_text;
}

export function setupTranslator (
    inputElement: HTMLTextAreaElement,
    cpuOutputElement: HTMLTextAreaElement,
    cloudOutputElement: HTMLTextAreaElement,
    button: HTMLButtonElement,
    cpuSpeedElement: HTMLSpanElement,
    cloudSpeedElement: HTMLSpanElement
) {
    const startTranslation = () => {
        recognition.start();
        recognition.onresult = async ( event ) => {
            let text = '';
            for ( let i = event.resultIndex; i < event.results.length; i++ ) {
                if ( event.results[i].isFinal ) {
                    text += event.results[i][0].transcript;
                    console.log( 'Recognized:', text );
                }
            }
            inputElement.innerHTML = `Translating: ${text}`;

            const cpuStartTime = performance.now();
            const cloudStartTime = performance.now();
            let cpuEndTime = performance.now();
            let cloudEndTime = performance.now();

            const cpuTranslation = await translateWithCPU( text ).then( ( t ) => { cpuEndTime = performance.now(); return t; } );

            const cloudTranslation = await translateWithCloud( text, 'it' ).then( ( t ) => { cloudEndTime = performance.now(); return t; } );

            cpuOutputElement.innerHTML = `Translation (CPU): ${cpuTranslation}`;
            cloudOutputElement.innerHTML = `Translation (Cloud): ${cloudTranslation}`;

            const cpuDuration = ( cpuEndTime - cpuStartTime ).toFixed( 2 );
            const cloudDuration = ( cloudEndTime - cloudStartTime ).toFixed( 2 );

            cpuSpeedElement.textContent = `${cpuDuration} ms`;
            cloudSpeedElement.textContent = `${cloudDuration} ms`;
        };
    };

    button.addEventListener( 'click', () => startTranslation() );
}
