<script>
    import FileContainer from "../components/FileContainer.svelte";
    import Home from "../components/Home.svelte";
    import {fileViewerStore} from "../store"

    let currentFileData
    let currentFileContent

    fileViewerStore.subscribe(file => {
        currentFileData = file
        currentFileContent = window.fs.readFile(currentFileData.filePath)
    })
</script>

<div class="h-screen overflow-scroll" style="width: 85%">
    {#if currentFileData.fileName}
        <h1 class="font-medium mb-3">{currentFileData.fileName}</h1>
        {#await currentFileContent}
            <p>Loading</p>
        {:then code} 
            <FileContainer {code} />
        {/await}
    {:else}
        <Home/>
    {/if}
</div>