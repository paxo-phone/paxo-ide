<script>
    export let filePath

    let filePathSplitted = filePath.split('/')
    let fileName = filePathSplitted[filePathSplitted.length - 1]
</script>

{#if filePathSplitted[1] !== ".git" && filePathSplitted[1] !== "node_modules"}
    <div class="flex gap-1">
        {#each filePathSplitted as folder}
            {#if folder !== "."}
                <p>{folder}</p>
            {/if}
        {/each}
    </div>
{/if}
