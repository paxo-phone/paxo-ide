<script>
    import SidebarFile from "../components/SidebarFile.svelte";
    import {projectStore} from "../store"

    let currentProjectData
    let projectPath
    let files
    
    function getFiles(projectPath) {
        const data = window.fs.readFolderContent(projectPath)
        return data
    }

    projectStore.subscribe(project => {
        currentProjectData = project
        if(currentProjectData) {
            projectPath = currentProjectData.projectPath
        }
        if(projectPath) {
            files = getFiles(projectPath)
        } else {
            files = []
        }
    })
</script>

<div class="h-screen overflow-scroll" style="width: 15%">
    {#each files as file}
        <SidebarFile filePath={file} />
    {/each}
</div>
