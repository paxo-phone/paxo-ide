<script>
    import loader from '@monaco-editor/loader'
    import { onMount } from 'svelte'

    import { AutoCompleteProvider } from '../../editor/autocomplete'

    export let apiVersion
    export let filePath
    export let code
    export let language

    let editor

    onMount(async () => {
        await loader.init()

        document.querySelector("#editor-loader").style.display = 'none'

        const monaco = window.monaco
        const theme = await window.darkMode.get() === 'dark' ? 'vs-dark' : 'vs'

        editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: code,
            language: window.fs.fileTypes[language]
        })

        // forbid monaco to create a web worker
        window.MonacoEnvironment = {
            getWorker: function (_moduleId, _label) {
                return null;
            },
        }

        let autoComplete = new AutoCompleteProvider(monaco, editor, apiVersion)
        autoComplete.setTokens()
        autoComplete.setCompletion()
        autoComplete.setHovers()

        monaco.editor.setTheme(theme)
    })

    function save() {
        window.fs.editFile(filePath, editor.getValue())
    }

    document.addEventListener('keydown', (event) => {
        if((event.ctrlKey || event.metaKey) && event.key === 's') {
            save()
        }
    })

    $: {
        if (editor) {
            editor.setValue(code)
            monaco.editor.setModelLanguage(editor.getModel(), window.fs.fileTypes[language])
        }
    }
</script>

<div id="editor-container" style="height: 90vh;position: relative;">

    <div id="editor-loader">
        <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL (adapted for compatibility to an electron app by Welpike) -->
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                <path class="rotate" d="M36 18c0-9.94-8.06-18-18-18"></path>
            </g></g>
        </svg>
    </div>

</div>
