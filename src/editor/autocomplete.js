import * as v1 from './paxolib/v1.js'

const API_VERSIONS = {
    v1
}

/**
 * https://ohdarling88.medium.com/4-steps-to-add-custom-language-support-to-monaco-editor-5075eafa156d
 */
export class AutoCompleteProvider {
    constructor(
        monaco,
        editor,
        apiVersion = "v1"
    ){
        this.monaco = monaco
        this.editor = editor
        this.apiVersion = apiVersion
        this.apiData = API_VERSIONS[this.apiVersion]
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

    /**
     * Paxolib API completion
     */
    setCompletion() {
        const splitPattern = /[ \.,-\/#!$%\^&\*;:{}=\-_`~()]/g

        this.monaco.languages.registerCompletionItemProvider('lua', {
            provideCompletionItems: (model, position) => {
                let lineContent = model.getLineContent(position.lineNumber)
                let lastToken = lineContent.split(splitPattern)[lineContent.split(splitPattern).length - 1]
                let secondLastToken = lineContent.split(splitPattern)[lineContent.split(splitPattern).length - 2]

                /**
                 * if the last token or if the second last token (e.g: `gui:w` -> ['gui', 'w']) is a paxolib namespace -> user wants to call a function
                 */
                if(this.apiData.API_NAMESPACES.includes(lastToken)) {
                    return {
                        suggestions: this.apiData.getSuggestions(this.monaco, lastToken, 'functions')
                    }
                }
                else if(this.apiData.API_NAMESPACES.includes(secondLastToken)) {
                    return {
                        suggestions: this.apiData.getSuggestions(this.monaco, secondLastToken, 'functions')
                    }
                }
                /**
                 * if there's a ':' in the lasts characters of the line
                 * 
                 * it's not really clean but it's enough for monaco (monaco will continue to suggest after the three chars passed)
                 */
                else if(
                    lineContent[lineContent.length - 1] === ':' ||
                    lineContent[lineContent.length - 2] === ':' ||
                    lineContent[lineContent.length - 3] === ':'
                ) {
                    // TODO: process to determine the type of the object to suggest the rights methods
                    let suggests = []

                    // get all methods of the paxolib
                    this.apiData.API_NAMESPACES.forEach(namespace => {
                        suggests = suggests.concat(this.apiData.getSuggestions(this.monaco, namespace, 'methods'))
                    })

                    return {
                        suggestions: suggests
                    }
                }

                return {
                    suggestions: [
                        ...['and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while'].map(k => {
                            return {
                                label: k,
                                kind: this.monaco.languages.CompletionItemKind.keywords,
                                insertText: k
                            }
                        }),

                        { label: 'COLOR_LIGHT', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_LIGHT', detail: '#FFFFFF' },
                        { label: 'COLOR_EXTRA_LIGHT', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_EXTRA_LIGHT', detail: '#F3F3F3' },
                        { label: 'COLOR_DARK', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_DARK', detail: '#2D3436' },
                        { label: 'COLOR_GRAY', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_GRAY', detail: '#A3A3A3' },
                        { label: 'COLOR_PRIMARY', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_PRIMARY', detail: '#6C5CE7' },
                        { label: 'COLOR_SUCCESS', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_SUCCESS', detail: '#0B894' },
                        { label: 'COLOR_WARNING', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_WARNING', detail: '#E17055' },
                        { label: 'COLOR_ERROR', kind: this.monaco.languages.CompletionItemKind.Variable, insertText: 'COLOR_ERROR', detail: '#D63031' },

                        { label: 'print', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'print(', detail: 'print(text)' },
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
        return this.apiData.API_SIGNATURES[word]
    }
}
