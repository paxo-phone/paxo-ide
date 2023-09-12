<script>
    import loader from '@monaco-editor/loader'
    import { onMount } from 'svelte'
    import {fileViewerStore} from "../store"

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

    // function save() {
    //     console.log("saving")
    //     document.querySelectorAll('input.editor-line').forEach(input => {
    //         console.log(input.value)
    //     })
    // }

    // document.addEventListener('keydown', (event) => {
    //     if((event.ctrlKey || event.metaKey) && event.key === 's') {
    //         save()
    //     }
    // })
</script>

<div id="editor-container" style="height: 90vh;">

</div>
