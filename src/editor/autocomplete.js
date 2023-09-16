
/**
 * https://ohdarling88.medium.com/4-steps-to-add-custom-language-support-to-monaco-editor-5075eafa156d
 */
export class AutoCompleteProvider {
    constructor(
        monaco,
        editor
    ){
        this.monaco = monaco
        this.editor = editor
    }

    /**
     * Tokens implemented by Microsoft https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/lua/lua.ts
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License. See License.txt in the project root for license information.
     */
    setTokens() {
        this.monaco.languages.setMonarchTokensProvider('lua', {
            defaultToken: '',
            tokenPostfix: '.lua',

            keywords: [ 'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while' ],

            brackets: [
                { token: 'delimiter.bracket', open: '{', close: '}' },
                { token: 'delimiter.array', open: '[', close: ']' },
                { token: 'delimiter.parenthesis', open: '(', close: ')' }
            ],

            operators: [ '+', '-', '*', '/', '%', '^', '#', '==', '~=', '<=', '>=', '<', '>', '=', ';', ':', ',', '.', '..', '...' ],

            // we include these common regular expressions
            symbols: /[=><!~?:&|+\-*\/\^%]+/,
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

            // The main tokenizer for our languages
            tokenizer: {
                root: [
                    // identifiers and keywords
                    [
                        /[a-zA-Z_]\w*/,
                        {
                            cases: {
                                '@keywords': { token: 'keyword.$0' },
                                '@default': 'identifier'
                            }
                        }
                    ],
                    // whitespace
                    { include: '@whitespace' },

                    // keys
                    [/(,)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ['delimiter', '', 'key', '', 'delimiter']],
                    [/({)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ['@brackets', '', 'key', '', 'delimiter']],

                    // delimiters and operators
                    [/[{}()\[\]]/, '@brackets'],
                    [
                        /@symbols/,
                        {
                            cases: {
                                '@operators': 'delimiter',
                                '@default': ''
                            }
                        }
                    ],

                    // numbers
                    [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                    [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
                    [/\d+?/, 'number'],

                    // delimiter: after number because of .\d floats
                    [/[;,.]/, 'delimiter'],

                    // strings: recover on non-terminated strings
                    [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
                    [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
                    [/"/, 'string', '@string."'],
                    [/'/, 'string', "@string.'"]
                ],

                whitespace: [
                    [/[ \t\r\n]+/, ''],
                    [/--\[([=]*)\[/, 'comment', '@comment.$1'],
                    [/--.*$/, 'comment']
                ],

                comment: [
                    [/[^\]]+/, 'comment'],
                    [
                        /\]([=]*)\]/,
                        {
                            cases: {
                                '$1==$S2': { token: 'comment', next: '@pop' },
                                '@default': 'comment'
                            }
                        }
                    ],
                    [/./, 'comment']
                ],

                string: [
                    [/[^\\"']+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/\\./, 'string.escape.invalid'],
                    [
                        /["']/,
                        {
                            cases: {
                                '$#==$S2': { token: 'string', next: '@pop' },
                                '@default': 'string'
                            }
                        }
                    ]
                ]
            }
        })
    }

    setCompletion() {
        this.monaco.languages.registerCompletionItemProvider('lua', {
            provideCompletionItems: (model, position) => {
                return {
                    suggestions: [
                        ...['and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while'].map(k => {
                            return {
                                label: k,
                                kind: this.monaco.languages.CompletionItemKind.keywords,
                                insertText: k
                            }
                        }),

                        { label: 'BOX_TYPE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'BOX_TYPE' },
                        { label: 'BUTTON_TYPE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'BUTTON_TYPE' },
                        { label: 'LABEL_TYPE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'LABEL_TYPE' },
                        { label: 'WINDOW_TYPE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'WINDOW_TYPE' },
                        { label: 'IMAGE_TYPE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'IMAGE_TYPE' },
                        { label: 'COLOR_LIGHT', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_LIGHT' },
                        { label: 'COLOR_BLACK', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_BLACK' },
                        { label: 'COLOR_PRIMARY', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_PRIMARY' },
                        { label: 'COLOR_SUCCESS', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_SUCCESS' },
                        { label: 'COLOR_WHITE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_WHITE' },
                        { label: 'COLOR_WARNING', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_WARNING' },
                        { label: 'COLOR_BLUE', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_BLUE' },

                        { label: 'print', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'print(', detail: 'Print' },
                        { label: 'gui', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'gui(' },

                        { label : 'setX', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setX(' },
                        { label : 'setY', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setY(' },
                        { label : 'getX', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getX(' },
                        { label : 'getY', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getY(' },
                        { label : 'setWidth', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setWidth(' },
                        { label : 'setHeight', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setHeight(' },
                        { label : 'getWidth', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getWidth(' },
                        { label : 'getHeight', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getHeight(' },
                        { label : 'setColor', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setColor(' },
                        { label : 'setText', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setText(' },
                        { label : 'fillRect', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'fillRect(' },
                        { label : 'push', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'push(' },
                        { label : 'onClick', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'onClick(' },
                        
                        { label : 'setWindow', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'setWindow(' },
                        { label : 'getWindow', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'getWindow(' },
                        { label : 'window', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'window(' },
                        { label : 'box', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'box(' },
                        { label : 'label', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'label(' },
                        { label : 'button', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'button(' },
                        { label : 'canvas', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'canvas(' },
                        { label : 'sleep', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'sleep(' },
                        { label : 'readFile', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'readFile(' },
                        { label : 'writeFile', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'writeFile(' },
                    ],
                }
            },
        })
    }

    setHovers() {
        this.monaco.languages.registerHoverProvider('lua', {
            provideHover(model, position, token) {
                const word = model.getWordAtPosition(position);
            
                if(word) {
                    const documentation = AutoCompleteProvider.getDocumentation(word.word)
                    if(documentation) {
                        return Promise.resolve({
                            range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
                            contents: [{ value: `${word.word}: ${documentation.type} | ${documentation.text}` }]
                        })
                    }
                }
                return Promise.resolve(null)
            }
        })
    }

    static getDocumentation(word) {
        /**
         * TODO: complete doc
         */
        const LUA_API_SIGNATURES = {
            BOX_TYPE: { type: 'const', text: 'lorem ipsum...' },
            BUTTON_TYPE: { type: 'const', text: 'lorem ipsum...' },
            LABEL_TYPE: { type: 'const', text: 'lorem ipsum...' },
            WINDOW_TYPE: { type: 'const', text: 'lorem ipsum...' },
            IMAGE_TYPE: { type: 'const', text: 'lorem ipsum...' },
            COLOR_LIGHT: { type: 'const', text: 'lorem ipsum...' },
            COLOR_BLACK: { type: 'const', text: 'lorem ipsum...' },
            COLOR_PRIMARY: { type: 'const', text: 'lorem ipsum...' },
            COLOR_SUCCESS: { type: 'const', text: 'lorem ipsum...' },
            COLOR_WHITE: { type: 'const', text: 'lorem ipsum...' },
            COLOR_WARNING: { type: 'const', text: 'lorem ipsum...' },
            COLOR_BLUE: { type: 'const', text: 'lorem ipsum...' },

            print: { type: 'function', text: 'Displays a message in the console' },
            gui: { type: 'function', text: 'lorem ipsum...' },

            setX: { type: 'method', text: 'lorem ipsum...' },
            setY: { type: 'method', text: 'lorem ipsum...' },
            getX: { type: 'method', text: 'lorem ipsum...' },
            getY: { type: 'method', text: 'lorem ipsum...' },
            setWidth: { type: 'method', text: 'lorem ipsum...' },
            setHeight: { type: 'method', text: 'lorem ipsum...' },
            getWidth: { type: 'method', text: 'lorem ipsum...' },
            getHeight: { type: 'method', text: 'lorem ipsum...' },
            setColor: { type: 'method', text: 'lorem ipsum...' },
            setText: { type: 'method', text: 'lorem ipsum...' },
            fillRect: { type: 'method', text: 'lorem ipsum...' },
            push: { type: 'method', text: 'lorem ipsum...' },
            onClick: { type: 'method', text: 'lorem ipsum...' },
            
            setWindow: { type: 'function', text: 'lorem ipsum...' },
            getWindow: { type: 'function', text: 'lorem ipsum...' },
            window: { type: 'function', text: 'lorem ipsum...' },
            box: { type: 'function', text: 'lorem ipsum...' },
            label: { type: 'function', text: 'lorem ipsum...' },
            button: { type: 'function', text: 'lorem ipsum...' },
            canvas: { type: 'function', text: 'lorem ipsum...' },
            sleep: { type: 'function', text: 'lorem ipsum...' },
            readFile: { type: 'function', text: 'lorem ipsum...' },
            writeFile: { type: 'function', text: 'lorem ipsum...' }
        }
        return LUA_API_SIGNATURES[word]
    }
}
