<script>
    import MonacoEditor from "../components/MonacoEditor.svelte";
    import Home from "../components/Home.svelte";
    import {fileViewerStore} from "../store"

    let currentFileData
    let currentFileContent
    let currentFileNameSplitted
    let currentFileLanguage

    fileViewerStore.subscribe(file => {
        currentFileData = file
        currentFileContent = window.fs.readFile(currentFileData.filePath)
        currentFileNameSplitted = currentFileData.fileName ? currentFileData.fileName.split('.') : undefined
        currentFileLanguage = currentFileNameSplitted ? currentFileNameSplitted[currentFileNameSplitted.length - 1] : undefined
    })
</script>

<div class="h-screen overflow-scroll" style="width: 80%">
    {#if currentFileData.fileName}
        <h1 class="font-medium mb-3">{currentFileData.fileName}</h1>
        {#await currentFileContent}
            <p>Loading</p>
        {:then code} 
            <MonacoEditor {code} {currentFileLanguage} />
        {/await}
    {:else}
        <Home/>
    {/if}
</div>