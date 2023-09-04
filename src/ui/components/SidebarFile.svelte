<script>
    import {fileViewerStore} from "../store"

    export let filePath

    $fileViewerStore

    let filePathSplitted = filePath.split('/')
    let fileName = filePathSplitted[filePathSplitted.length - 1]

    async function viewFile() {
        fileViewerStore.set({
            filePath: filePath,
            fileName: fileName
        })
    }
</script>

{#if filePathSplitted[1] !== ".git" && filePathSplitted[1] !== "node_modules"}
    <div class="flex gap-1">
        {#each filePathSplitted as folder}
            {#if folder !== "."}
                <button on:click={viewFile}>{folder}</button>
            {/if}
        {/each}
    </div>
{/if}
