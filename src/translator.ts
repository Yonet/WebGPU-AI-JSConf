const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

export function setupTranslator ( element: HTMLButtonElement ) {
    let text = 'Something to translate';
    const startTranslation = ( text: string ) => {
        console.log( 'Translating:', text );
        element.innerHTML = `Translating: ${text}`;
    };
    element.addEventListener( 'click', () => startTranslation( text ) );
    startTranslation( text );
}
