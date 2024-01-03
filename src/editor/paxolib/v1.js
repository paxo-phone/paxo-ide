
const API_NAMESPACES = [
    'gui',
    'storage',
    'time',
    'esp',
    'httpClient',
    'gsm',
    'json',
]

const API_SIGNATURES = {
    COLOR_LIGHT: { type: 'const', text: '#FFFFFF' },
    COLOR_EXTRA_LIGHT: { type: 'const', text: '#F3F3F3' },
    COLOR_DARK: { type: 'const', text: '#2D3436' },
    COLOR_GRAY: { type: 'const', text: '#A3A3A3' },
    COLOR_PRIMARY: { type: 'const', text: '#6C5CE7' },
    COLOR_SUCCESS: { type: 'const', text: '#00B894' },
    COLOR_WARNING: { type: 'const', text: '#E17055' },
    COLOR_ERROR: { type: 'const', text: '#D63031' },

    print: { type: 'function', text: 'print(text) *Displays a message in the console*' },

    // GUI
    
    window: { type: 'function', text: 'gui:window() *Create a new window*' },
    setWindow: { type: 'function', text: 'gui:setWindow(window) *Set a window (created before with paxolib:window())*' },
    label: { type: 'function', text: 'gui:label(window, x, y, w, h) *Create a new label*' },
    input: { type: 'function', text: 'gui:input(window, x, y, w, h) *Create a new input*' },
    box: { type: 'function', text: 'gui:box(window, x, y, w, h) *Create a new box*' },
    button: { type: 'function', text: 'gui:button(win, x, y, w, h) *Create a new button*' },
    list: { type: 'function', text: 'gui:list(win, x, y, w, h) *Create a new list*' },
    image: { type: 'function', text: 'gui:image(win, path, x, y, w, h) *Create a new image*' },
    //canvas: { type: 'function', text: 'gui:canvas(window, x, y, w, h) *Create a new canvas*' },
    
    setX: { type: 'method', text: 'obj:setX(x) *Set x position of a widget*' },
    setY: { type: 'method', text: 'obj:setY(y) *Set y position of a widget*' },
    getX: { type: 'method', text: 'obj:getX() *Get x position of a widget*' },
    getY: { type: 'method', text: 'obj:getY() *Get y position of a widget*' },
    setWidth: { type: 'method', text: 'obj:setWidth(w) *Set width of a widget*' },
    setHeight: { type: 'method', text: 'obj:setHeight(h) *Set height of a widget*' },
    getWidth: { type: 'method', text: 'obj:getWidth() *Get width of a widget*' },
    getHeight: { type: 'method', text: 'obj:getHeight() *Get height of a widget*' },

    setMainColor: { type: 'method', text: 'obj:setMainColor(color) *Set a color on a widget*' },
    setBorderColor: { type: 'method', text: 'obj:setBorderColor(color) *Set a color on the border of a widget*' },

    enable: { type: 'method', text: 'obj:enable() *Enable the widget*' },
    disable: { type: 'method', text: 'obj:disable() *Disable the widget*' },
    isTouched: { type: 'method', text: 'obj:isTouched() *Returns true if the widget is touched on screen*' },

    //fillRect: { type: 'method', text: 'obj:fillRect(x, y, w, h, COLOR_*) *Draw a rectangle*. **REQUIREMENT**: obj must be a canvas' },
    //push: { type: 'method', text: 'obj:push() *Updates a canvas element*. **REQUIREMENT**: obj must be a canvas' },
    
    onClick: { type: 'method', text: 'obj:onClick(cb) *Calls a function in args when the widget is clicked*' },
    onScrollUp: { type: 'method', text: 'obj:onScrollUp(cb) *Calls a function in args when the user scrolls to the top of the widget*' },
    onScrollDown: { type: 'method', text: 'obj:onScrollDown(cb) *Calls a function in args when the user scrolls to the bottom of the widget*' },
    onScrollRight: { type: 'method', text: 'obj:onScrollRight(cb) *Calls a function in args when the user scrolls to the right of the widget*' },
    onScrollLeft: { type: 'method', text: 'obj:onScrollLeft(cb) *Calls a function in args when the user scrolls to the left of the widget*' },
    
    setText: { type: 'method', text: 'obj:setText(text) *Display a text in a label*. **REQUIREMENT**: obj must be a label or an input' },
    getText: { type: 'method', text: 'obj:getText() *Gets the text in a label*. **REQUIREMENT**: obj must be a label or an input' },
    setFontSize: { type: 'method', text: 'obj:setFontSize(size) *Sets the font size of a label/input. **REQUIREMENT**: obj must be a label or an input*' },
    setBool: { type: 'method', text: 'obj:setBool(bool) * **REQUIREMENT**: obj must be a label or an input*' },
    setTextColor: { type: 'method', text: 'obj:setTextColor() *Sets the text color of a label/input. **REQUIREMENT**: obj must be a label or an input*' },
    setTextVerticalAlignment: { type: 'method', text: 'obj:setTextVerticalAlignment(alignment) *Sets text vertical alignment. **REQUIREMENT**: obj must be a label or an input*' },
    setTextHorizontalAlignment: { type: 'method', text: 'obj:setTextHorizontalAlignment(alignment) *Sets text horizontal alignment. **REQUIREMENT**: obj must be a label or an input*' },

    onChange: { type: 'method', text: 'obj:onChange(callback) *Calls a function in args when the user is typing on the input. **REQUIREMENT**: obj must be an input*'},

    // STORAGE
    file: { type: 'function', text: 'storage:file(path, writeMode) *Create a new file*' },
    mkdir: { type: 'function', text: 'storage:mkdir(path) *Create a new directory*' },
    mvFile: { type: 'function', text: 'storage:mvFile(from, to) *Rename a file*' },
    mvDir: { type: 'function', text: 'storage:mvDir(from, to) *Rename a directory*' },
    rmFile: { type: 'function', text: 'storage:rmFile(path) *Delete a file*' },
    rmDir: { type: 'function', text: 'storage:rmDir(path) *Delete a directory*' },
    listDir: { type: 'function', text: 'storage:listDir(path) *Get the list of files/directories in a directory*' },
    isFile: { type: 'function', text: 'storage:isFile(path) *Checks if an object is a file*' },
    isDir: { type: 'function', text: 'storage:isDir(path) *Checks if an object is a directory*' },

    write: { type: 'method', text: 'file:write(string) *Write in a file*' },
    readLine: { type: 'method', text: 'file:() *Read a line of the file*' }, // pb: numero of the line ?
    readChar: { type: 'method', text: 'file:() *Read the first char of the file*' },
    readAll: { type: 'method', text: 'file:() *Read all the file*' },

    // TIME

    monotonic: { type: 'function', text: 'time:monotonic() *Get the number of milliseconds since start of the app*' },
    hour_get: { type: 'function', text: 'time:hour:get() *return the actual hour format = “seconds,minutes,hours,days,months,years”*' },
    //sleep: { type: 'function', text: 'time:sleep(ms) *Make a pause in the execution*' },

    // HARDWARE

    setBrightness: { type: 'function', text: 'esp:setBrightness(level) *Set the level of brightness. **WARNING**: 0 <= level < 255*' },
    setLed: { type: 'function', text: 'esp:setLed(level) *Set the level of leds. **WARNING**: 0 <= level < 255*' },

    // NETWORK - wait for a new implementation

    get: { type: 'function', text: 'httpClient:get(url, callback) *Launch a GET request to the url. **IMPORTANT**: If callback is set, the callback will be called when the phone received the server response, else, the process will wait the server response to continue' },
    post: { type: 'function', text: 'httpClient:post(url, callback) *Launch a POST request to the url. **IMPORTANT**: If callback is set, the callback will be called when the phone received the server response, else, the process will wait the server response to continue' },

    // GSM

    sendMessage: { type: 'function', text: 'gsm:sendMessage(number, message) *Send a message to someone*' },
    call: { type: 'function', text: 'gsm:call(number) *Call someone*' },
    getMessagePath: { type: 'function', text: 'gsm:getMessagePath() *Returns the directory path of contact and messages*' },

    // JSON
}

function getSuggestions(monaco, namespace, type){
    let API = {
        gui: {
            namespace: 'gui',
            functions: [
                { label : 'window', kind: monaco.languages.CompletionItemKind.Function, insertText: 'window(', detail: 'gui:window()' },
                { label : 'setWindow', kind: monaco.languages.CompletionItemKind.Function, insertText: 'setWindow(', detail: 'gui:setWindow(window)' },
                { label : 'label', kind: monaco.languages.CompletionItemKind.Function, insertText: 'label(', detail: 'gui:label(win, x, y, w, h)' },
                { label : 'input', kind: monaco.languages.CompletionItemKind.Function, insertText: 'input(', detail: 'gui:input(win, x, y, w, h)' },
                { label : 'box', kind: monaco.languages.CompletionItemKind.Function, insertText: 'box(', detail: 'gui:box(win, x, y, w, h)' },
                { label : 'button', kind: monaco.languages.CompletionItemKind.Function, insertText: 'button(', detail: 'gui:button(win, x, y, w, h)' },
                { label : 'list', kind: monaco.languages.CompletionItemKind.Function, insertText: 'list(', detail: 'gui:button(win, x, y, w, h)' },
                { label: 'image', kind: monaco.languages.CompletionItemKind.Function, insertText: 'image(', detail: 'gui:image(win, path, x, y, w, h)'},
                // pb: canvas() ?
            ],
            methods: [
                // all
                { label : 'setX', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setX(', detail: 'obj:setX(x)' },
                { label : 'setY', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setY(', detail: 'obj:setY(y)' },
                { label : 'getX', kind: monaco.languages.CompletionItemKind.Method, insertText: 'getX()', detail: 'obj:getX()' },
                { label : 'getY', kind: monaco.languages.CompletionItemKind.Method, insertText: 'getY()', detail: 'obj:getY()' },
                { label : 'setWidth', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setWidth(', detail: 'obj:setWidth(w)' },
                { label : 'setHeight', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setHeight(', detail: 'obj:setHeight(h)' },
                { label : 'getWidth', kind: monaco.languages.CompletionItemKind.Method, insertText: 'getWidth()', detail: 'obj:getWidth()' },
                { label : 'getHeight', kind: monaco.languages.CompletionItemKind.Method, insertText: 'getHeight()', detail: 'obj:getHeight()' },

                { label : 'setMainColor', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setMainColor(', detail: 'obj:setMainColor(COLOR_*)' },
                { label : 'setBorderColor', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setBorderColor(', detail: 'obj:setBorderColor(COLOR_*)' },

                { label : 'enable', kind: monaco.languages.CompletionItemKind.Method, insertText: 'enable()', detail: 'obj:enable()' },
                { label : 'disable', kind: monaco.languages.CompletionItemKind.Method, insertText: 'disable()', detail: 'obj:disable()' },
                { label : 'isTouched', kind: monaco.languages.CompletionItemKind.Method, insertText: 'isTouched()', detail: 'obj:isTouched()' },

                { label : 'fillRect', kind: monaco.languages.CompletionItemKind.Method, insertText: 'fillRect(', detail: 'obj:fillRect(x, y, w, h, COLOR_*)' },  // pb: not in new version
                { label : 'push', kind: monaco.languages.CompletionItemKind.Method, insertText: 'push(', detail: 'obj:push()' },  // pb: not in new version

                { label : 'onClick', kind: monaco.languages.CompletionItemKind.Method, insertText: 'onClick(', detail: 'obj:onClick(callback)' },
                { label : 'onScrollUp', kind: monaco.languages.CompletionItemKind.Method, insertText: 'onScrollUp(', detail: 'obj:onScrollUp(callback)' },
                { label : 'onScrollDown', kind: monaco.languages.CompletionItemKind.Method, insertText: 'onScrollDown(', detail: 'obj:onScrollDown(callback)' },
                { label : 'onScrollRight', kind: monaco.languages.CompletionItemKind.Method, insertText: 'onScrollRight(', detail: 'obj:onScrollRight(callback)' },
                { label : 'onScrollLeft', kind: monaco.languages.CompletionItemKind.Function, insertText: 'onScrollLeft(', detail: 'obj:onScrollLeft(callback)' },

                // TODO: find a way to exclude these suggestions if the object is not a label or an input

                // only labels & inputs
                { label : 'setText', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setText(', detail: 'obj:setText(text)' },
                { label : 'getText', kind: monaco.languages.CompletionItemKind.Method, insertText: 'getText()', detail: 'obj:getText()' },
                { label : 'setFontSize', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setFontSize(', detail: 'obj:setFontSize(size)' },
                { label : 'setBool', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setBool(', detail: 'obj:setBool(bool)' },   // wtf is that ??
                { label : 'setTextColor', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setTextColor(', detail: 'obj:setTextColor(color)' },
                { label : 'setTextVerticalAlignment', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setTextVerticalAlignment(', detail: 'obj:setTextVerticalAlignment(alignment)' },
                { label : 'setTextHorizontalAlignment', kind: monaco.languages.CompletionItemKind.Method, insertText: 'setTextHorizontalAlignment(', detail: 'obj:setTextHorizontalAlignment(alignment)' },

                // only inputs
                { label : 'onChange', kind: monaco.languages.CompletionItemKind.Method, insertText: 'onChange(', detail: 'obj:onChange(callback)' },
            ],
        },
        storage: {
            namespace: 'storage',
            functions: [
                { label : 'file', kind: monaco.languages.CompletionItemKind.Function, insertText: 'file(', detail: 'storage:file(path, writeMode)' },
                { label : 'mkdir', kind: monaco.languages.CompletionItemKind.Function, insertText: 'mkdir(', detail: 'storage:mkdir(path)' },
                { label : 'mvFile', kind: monaco.languages.CompletionItemKind.Function, insertText: 'mvFile(', detail: 'storage:mvFile(from, to)' },
                { label : 'mvDir', kind: monaco.languages.CompletionItemKind.Function, insertText: 'mvDir(', detail: 'storage:mvDir(from, to)' },
                { label : 'rmFile', kind: monaco.languages.CompletionItemKind.Function, insertText: 'rmFile(', detail: 'storage:rmFile(path)' },
                { label : 'rmDir', kind: monaco.languages.CompletionItemKind.Function, insertText: 'rmDir(', detail: 'storage:rmDir(path)' },
                { label : 'listDir', kind: monaco.languages.CompletionItemKind.Function, insertText: 'listDir(', detail: 'storage:listDir(path)' },
                { label : 'isFile', kind: monaco.languages.CompletionItemKind.Function, insertText: 'isFile(', detail: 'storage:isFile(path)' },
                { label : 'isDir', kind: monaco.languages.CompletionItemKind.Function, insertText: 'isDir(', detail: 'storage:isDir(path)' },
            ],
            methods: [
                { label : 'write', kind: monaco.languages.CompletionItemKind.Method, insertText: 'write(', detail: 'obj:write(string)' },
                { label : 'readLine', kind: monaco.languages.CompletionItemKind.Method, insertText: 'readLine(', detail: 'obj:readLine()' }, // pb: missing arg?
                { label : 'readChar', kind: monaco.languages.CompletionItemKind.Method, insertText: 'readChar()', detail: 'obj:readChar()' },
                { label : 'readAll', kind: monaco.languages.CompletionItemKind.Method, insertText: 'readAll()', detail: 'obj:readAll()' },
            ],
        },
        time: {
            namespace: 'time',
            functions: [
                { label : 'monotonic', kind: monaco.languages.CompletionItemKind.Function, insertText: 'time:monotonic()', detail: 'time:monotonic()' },
                { label : 'hour:get', kind: monaco.languages.CompletionItemKind.Function, insertText: 'time:hour:get(', detail: 'time:hour:get()' },  // namespace strange
                // sleep?
            ],
            methods: [],
        },
        // hardware
        esp: {
            namespace: 'esp',
            functions: [
                { label : 'setBrightness', kind: monaco.languages.CompletionItemKind.Function, insertText: 'esp:setBrightness(', detail: 'esp:setBrightness(level)' },
                { label : 'setLed', kind: monaco.languages.CompletionItemKind.Function, insertText: 'esp:setLed(', detail: 'esp:setLed(level)' },
            ],
            methods: [],
        },
        // network
        httpClient: {
            namespace: 'httpClient',
            functions: [
                // maybe a new implementation (fetch api like in javascript)
                { label : 'get', kind: monaco.languages.CompletionItemKind.Function, insertText: 'httpClient:get(', detail: 'httpClient:get(url)' },  // maybe call it syncGet()
                { label : 'post', kind: monaco.languages.CompletionItemKind.Function, insertText: 'httpClient:post(', detail: 'httpClient:post(url)' },  // maybe call it syncPost()
                { label : 'get', kind: monaco.languages.CompletionItemKind.Function, insertText: 'httpClient:get(', detail: 'httpClient:get(url, callback)' },
                { label : 'post', kind: monaco.languages.CompletionItemKind.Function, insertText: 'httpClient:post(', detail: 'httpClient:post(url, callback)' },
            ],
            methods: [],
        },
        gsm: {
            namespace: 'gsm',   // not sure about that
            functions: [
                { label : 'sendMessage', kind: monaco.languages.CompletionItemKind.Function, insertText: 'gsm:sendMessage(', detail: 'gsm:sendMessage(number, message)' },
                { label : 'call', kind: monaco.languages.CompletionItemKind.Function, insertText: 'gsm:call(', detail: 'gsm:call(number)' },
                { label : 'getMessagePath', kind: monaco.languages.CompletionItemKind.Function, insertText: 'gsm:getMessagePath()', detail: 'gsm:getMessagePath()' },
            ],
            methods: [],
        },
        json: {
            namespace: 'json',
            functions: [

            ],
            methods: [],
        },
    }

    return API[namespace][type]
}

export {
    API_NAMESPACES,
    API_SIGNATURES,
    getSuggestions
}
