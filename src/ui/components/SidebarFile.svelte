<script>
    import {fileViewerStore} from "../store"

    export let projectPath
    export let filePath

    $fileViewerStore

    let filePathSplitted = filePath.split('/')
    let fileName = filePathSplitted[filePathSplitted.length - 1]

    function viewFile() {
        fileViewerStore.set({
            filePath: filePath,
            fileName: fileName
        })
    }

    function deleteFile() {
        window.fs.deleteFile(filePath)
        window.location.reload()
    }
</script>

{#if filePathSplitted[1] !== ".git" && filePathSplitted[1] !== "node_modules"}
    <div class="flex gap-1 relative">
        {#each filePathSplitted as folder}
            {#if folder !== projectPath}
                <button on:click={viewFile}>{folder}</button>
            {/if}
        {/each}
        <button class="absolute translate-x-1/2 right-2" on:click={deleteFile}>D</button>
    </div>
{/if}
