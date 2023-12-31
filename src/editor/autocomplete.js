
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

    /**
     * Paxolib API completion
     */
    setCompletion() {
        this.monaco.languages.registerCompletionItemProvider('lua', {
            provideCompletionItems: (model, position) => {
                let lineContent = model.getLineContent(position.lineNumber)

                if(
                    lineContent.split(/[.\s]+/)[lineContent.split(/[.\s]+/).length - 2] === "paxolib" || 
                    lineContent.split(/[.\s]+/)[lineContent.split(/[.\s]+/).length - 2] === "paxo" || 
                    lineContent.split(/[.\s]+/)[lineContent.split(/[.\s]+/).length - 2] === "p"
                ) {
                    return {
                        suggestions: [
                            { label : 'setWindow', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'setWindow(', detail: 'paxolib.setWindow(window)' },
                            { label : 'getWindow', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'getWindow(', detail: 'paxolib.getWindow()' },
                            { label : 'window', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'window(', detail: 'paxolib.window(name)' },
                            { label : 'box', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'box(', detail: 'paxolib.box(window, x, y, w, h)' },
                            { label : 'label', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'label(', detail: 'paxolib.label(window, x, y, w, h)' },
                            { label : 'button', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'button(', detail: 'paxolib.button(window, x, y, w, h)' },
                            { label : 'canvas', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'canvas(', detail: 'paxolib.canvas(window, x, y, w, h)' },
                            { label : 'sleep', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'sleep(', detail: 'paxolib.sleep(ms)' },
                            { label : 'readFile', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'readFile(', detail: 'paxolib.readFile(path)' },
                            { label : 'writeFile', kind: this.monaco.languages.CompletionItemKind.Function, insertText: 'writeFile(', detail: 'paxolib.writeFile(path, content)' },
                        ]
                    }
                } 
                else if(lineContent[lineContent.length - 2] === ':') {
                    return {
                        suggestions: [
                            { label : 'setX', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setX(', detail: 'obj:setX()' },
                            { label : 'setY', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setY(', detail: 'obj:setY()' },
                            { label : 'getX', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getX(', detail: 'obj:getX()' },
                            { label : 'getY', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getY(', detail: 'obj:getY()' },
                            { label : 'setWidth', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setWidth(', detail: 'obj:setWidth(w)' },
                            { label : 'setHeight', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setHeight(', detail: 'obj:setHeight(h)' },
                            { label : 'getWidth', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getWidth(', detail: 'obj:getWidth()' },
                            { label : 'getHeight', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'getHeight(', detail: 'obj:getHeight()' },
                            { label : 'setColor', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setColor(', detail: 'obj:setColor(COLOR_*)' },
                            { label : 'setText', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'setText(', detail: 'obj:setText(text)' },
                            { label : 'fillRect', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'fillRect(', detail: 'obj:fillRect(x, y, w, h, COLOR_*)' },
                            { label : 'push', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'push(', detail: 'obj:push()' },
                            { label : 'onClick', kind: this.monaco.languages.CompletionItemKind.Method, insertText: 'onClick(', detail: 'obj:onClick(cb)' },
                        ]
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
        const LUA_API_SIGNATURES = {
            COLOR_LIGHT: { type: 'const', text: '#FFFFFF' },
            COLOR_EXTRA_LIGHT: { type: 'const', text: '#F3F3F3' },
            COLOR_DARK: { type: 'const', text: '#2D3436' },
            COLOR_GRAY: { type: 'const', text: '#A3A3A3' },
            COLOR_PRIMARY: { type: 'const', text: '#6C5CE7' },
            COLOR_SUCCESS: { type: 'const', text: '#00B894' },
            COLOR_WARNING: { type: 'const', text: '#E17055' },
            COLOR_ERROR: { type: 'const', text: '#D63031' },

            print: { type: 'function', text: 'print(text) *Displays a message in the console*' },

            setX: { type: 'method', text: 'obj:setX(x) *Set x position of a widget*' },
            setY: { type: 'method', text: 'obj:setY(y) *Set y position of a widget*' },
            getX: { type: 'method', text: 'obj:getX() *Get x position of a widget*' },
            getY: { type: 'method', text: 'obj:getY() *Get y position of a widget*' },
            setWidth: { type: 'method', text: 'obj:setWidth(w) *Set width of a widget*' },
            setHeight: { type: 'method', text: 'obj:setHeight(h) *Set height of a widget*' },
            getWidth: { type: 'method', text: 'obj:getWidth() *Get width of a widget*' },
            getHeight: { type: 'method', text: 'obj:getHeight() *Get height of a widget*' },
            setColor: { type: 'method', text: 'obj:setColor(COLOR_*) *Set a color on a widget*' },
            setText: { type: 'method', text: 'obj:setText(text) *Display a text in a label*. **REQUIREMENT**: obj must be a label' },
            fillRect: { type: 'method', text: 'obj:fillRect(x, y, w, h, COLOR_*) *Draw a rectangle*. **REQUIREMENT**: obj must be a canvas' },
            push: { type: 'method', text: 'obj:push() *Updates a canvas element*. **REQUIREMENT**: obj must be a canvas' },
            onClick: { type: 'method', text: 'obj:onClick(cb) *Takes a callback in args that will be called when the widget is clicked*' },
            
            setWindow: { type: 'function', text: 'paxolib.setWindow(window) *Set a window (created before with paxolib:window())*' },
            getWindow: { type: 'function', text: 'paxolib.getWindow() *Get current window*' },
            window: { type: 'function', text: 'paxolib.window(name) *Create a new window*' },
            box: { type: 'function', text: 'paxolib:box(window, x, y, w, h) *Create a new box*' },
            label: { type: 'function', text: 'paxolib.label(window, x, y, w, h) *Create a new label*' },
            button: { type: 'function', text: 'paxolib.button(window, x, y, w, h) *Create a new button*' },
            canvas: { type: 'function', text: 'paxolib.canvas(window, x, y, w, h) *Create a new canvas*' },
            sleep: { type: 'function', text: 'paxolib.sleep(ms) *Make a pause in the execution*' },
            readFile: { type: 'function', text: 'paxolib.readFile(path) *Read file content. Nota: the current path is the app root path*' },
            writeFile: { type: 'function', text: 'paxolib.writeFile(path, content) *Write text in a file. Nota: the current path is the app root path*' }
        }
        
        return LUA_API_SIGNATURES[word]
    }
}
