<script>
    import SidebarFile from "../components/SidebarFile.svelte";

    export let projectPath

    
    function getFiles() {
        const data = window.fs.readFolderContent(projectPath)
        return data
    }

    let files = getFiles()
</script>

<div class="h-screen overflow-scroll" style="width: 15%">
    {projectPath}
    {#each files as file}
        <SidebarFile filePath={file} />
    {/each}
</div>
