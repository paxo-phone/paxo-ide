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
            // let filePathSplitted = filePath.split('/')
            // let newPath = filePath
            // filePathSplitted.forEach(item => {
            //     if(item !== filePathSplitted[filePathSplitted.lenght - 1] || item.split('.').lenght === 1) {
            //         window.fs.newFolder(`${projectPath}/${newPath}/${item}`)
            //         filePath += "/" + item
            //     } else if(item !== "" && item === filePathSplitted[filePathSplitted.lenght - 1]) {
            //         window.fs.newFile(`${projectPath}/${newPath}/${item}`, '')
            //     }
            // })
            window.fs.newFile(`${projectPath}/${filePath}`, '')
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

<div class="h-screen overflow-scroll" style="width: 20%">
    <div>
        <input type="text" id="newFile" on:keydown={createNewFile}>
    </div>
    {#each files as file}
        <SidebarFile {projectPath} filePath={file} />
    {/each}
</div>
