<script>
    import { createEventDispatcher } from 'svelte'

    import MonacoEditor from "../components/MonacoEditor.svelte"
    import Home from "../components/Home.svelte"
    import {fileViewerStore} from "../store"

    let currentFileData
    let currentFileName
    let currentFilePath
    let currentFileContent
    let currentFileNameSplitted
    let currentFileLanguage

    const dispatch = createEventDispatcher()

    fileViewerStore.subscribe(async file => {
        currentFileData = file
        currentFileName = currentFileData.fileName
        currentFilePath = currentFileData.filePath
        currentFileContent = await window.fs.readFile(currentFileData.filePath)
        currentFileNameSplitted = currentFileData.fileName ? currentFileData.fileName.split('.') : undefined
        currentFileLanguage = currentFileNameSplitted ? currentFileNameSplitted[currentFileNameSplitted.length - 1] : undefined
        dispatch('filePathUpdated', currentFilePath)
        dispatch('fileContentUpdated', currentFileContent)
        dispatch('fileLanguageUpdated', currentFileLanguage)
    })
</script>

<div class="h-screen overflow-scroll w-4/5 m-3">
    {#if currentFileData.fileName}
        <h1 class="font-medium mb-3">{currentFileName}</h1>
        <MonacoEditor 
            bind:filePath={currentFilePath} 
            bind:code={currentFileContent} 
            bind:language={currentFileLanguage}
            on:filePathUpdated={event => currentFilePath = event.detail}
            on:fileContentUpdated={event => currentFileContent = event.detail}
            on:fileLanguageUpdated={event => currentFileLanguage = event.detail} />
    {:else}
        <Home/>
    {/if}
</div>