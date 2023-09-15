<script>
    import loader from '@monaco-editor/loader'
    import { onMount } from 'svelte'

    export let filePath
    export let code
    export let language

    let editor

    onMount(async () => {
        await loader.init()

        const monaco = window.monaco

        editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: code,
            language: window.fs.fileTypes[language]
        })
    })

    function save() {
        window.fs.editFile(filePath, editor.getValue())
    }

    document.addEventListener('keydown', (event) => {
        if((event.ctrlKey || event.metaKey) && event.key === 's') {
            save()
        }
    })
</script>

<div id="editor-container" style="height: 90vh;">

</div>
