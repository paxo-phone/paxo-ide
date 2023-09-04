<script>
    import SidebarFile from "../components/SidebarFile.svelte";

    export let projectPath

    
    function getFiles() {
        const data = window.fs.readFolderContent(projectPath)
        // let loop = true
        // while(loop) {
        //     data.forEach(file => {
        //         if(window.fs.isDirectory(projectPath + "/" + file)) {
        //             file.push(await window.fs.readFolderContent(projectPath + "/" + file))
        //         }
        //     })
        // }
        return data
    }

    let files = getFiles()
    
    // console.log(files)

    files.forEach(([folder, subFiles]) => {
        console.log(folder, subFiles)
    })
</script>

<div>
    {#await files}
        <p>Loading...</p>
    {:then files} 
        {#each files as file}
            <SidebarFile filePath={file} />
        {/each}
    {/await}
</div>
