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

    function createNewFile(event) {
        if(event.key === "Enter" && projectPath) {
            let filePath = event.srcElement.value
            let filePathSplitted = filePath.split('/')
            let folders = ""
            if (filePathSplitted.length > 1) {  // if there's a / in the filepath
                for(let folder of filePathSplitted) {
                    if(filePathSplitted.indexOf(folder) + 1 !== filePathSplitted.length) {  // if the folder is the last file
                        folders += "/" + folder
                    }
                }
                window.fs.newFolder(`${projectPath}/${folders}`)
            }
            window.fs.newFile(`${projectPath}${folders}/${filePathSplitted[filePathSplitted.length - 1]}`, '')
            window.location.reload()
        }
    }

    projectStore.subscribe(project => {
        currentProjectData = project
        if(currentProjectData) {
            projectPath = currentProjectData.projectPath
        }
        if(projectPath) {
            files = getFiles(projectPath)
            localStorage.setItem("projectPath", currentProjectData.projectName)
            localStorage.setItem("projectPath", projectPath)
        } else {
            projectPath = localStorage.getItem("projectPath")
            if(projectPath) {
                files = getFiles(projectPath)
            } else {
                files = []
            }
        }
    })
</script>

<div class="h-screen overflow-scroll w-1/5">
    <input type="text" id="newFile" on:keydown={createNewFile} class="w-full">
    {#each files as file}
        <SidebarFile {projectPath} filePath={file} />
    {/each}
</div>
