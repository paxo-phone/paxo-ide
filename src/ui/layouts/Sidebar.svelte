<script>
    import { FileEarmarkPlus, Folder2Open } from "svelte-bootstrap-icons"

    import SidebarFile from "../components/SidebarFile.svelte";
    import {projectStore} from "../store"

    let currentProjectData
    let projectName
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
            projectName = currentProjectData.projectName
            projectPath = currentProjectData.projectPath
        }
        if(projectPath) {
            files = getFiles(projectPath)
            localStorage.setItem("projectName", projectName)
            localStorage.setItem("projectPath", projectPath)
        } else {
            projectName = localStorage.getItem("projectName", projectName)
            projectPath = localStorage.getItem("projectPath")
            if(projectName && projectPath && window.fs.isFileExists(projectPath)) {
                files = getFiles(projectPath)
            } else {
                files = []
            }
        }
    })
</script>

<div class="h-screen overflow-scroll w-1/5">
    <div class="flex items-center">
        <FileEarmarkPlus />
        <input type="text" id="newFile" on:keydown={createNewFile} class="w-full">
    </div>
    <div class="flex items-center gap-3">
        <Folder2Open />
        <strong>{projectName}</strong>
    </div>
    {#each files as file}
        <SidebarFile {projectPath} filePath={file} />
    {/each}
</div>
