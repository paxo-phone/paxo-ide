<script>
    import { FolderPlus, FolderX } from "svelte-bootstrap-icons"

    import ModeHandler from "./ModeHandler.svelte";
    import {projectStore} from "../store"

    import NewProjectForm from "./NewProjectForm.svelte"

    $projectStore

    const projects = window.fs.readExistingProjects(window.fs.homeDir)

    function openProject(e) {
        let projectName = e.srcElement.parentElement.dataset.project
        projectStore.set({
            projectName: projectName,
            projectPath: projects[projectName]
        })
        window.location.reload()
    }

    function deleteProject(e) {
        if(!confirm('Do you really want to delete this project?')) return;

        let projectName

        if(e.srcElement.tagName === "BUTTON") {  // user clicked on the button but not on the icon
            projectName = e.srcElement.dataset.project
        } else {  // user clicked on the svg
            projectName = e.srcElement.parentElement.dataset.project
        }
        
        window.fs.deleteFolder(`${window.fs.homeDir}/paxoProjects/${projectName}`, true)
        window.location.reload()
    }

    function toggleNewProjectForm() {
        document.querySelector('#new-project-form').classList.toggle('hidden')
    }
</script>

<div class="m-3">
    <div class="flex items-center justify-center gap-4 w-full">
        <img src="./logo.png" alt="Paxo IDE" style="height: 50px; width: 50px;">
        <h1 class="font-bold" style="font-size: 45px;">Paxo IDE</h1>
    </div>

    <h1 class="font-medium">Welcome</h1>

    <div class="flex gap-5 mt-3">
        <h3 class="">Your projects</h3>
    
        <button on:click={toggleNewProjectForm} title="New">
            <FolderPlus />
        </button>
    </div>
    
    <div id="new-project-form" class="hidden">
        <NewProjectForm />
    </div>
    
    <div>
        {#each Object.keys(projects) as projectName}
            <div class="flex gap-3">
                <button on:click={openProject} data-project="{projectName}" class="flex">
                    <p class="me-3">{projectName}</p>
                    <span>{projects[projectName]}</span>
                </button>
                <button on:click={deleteProject} data-project="{projectName}" title="Delete project">
                    <FolderX />
                </button>
            </div>
        {/each}
    </div>

    <h1 class="font-medium mt-3 mb-2">Customization</h1>
    
    <ModeHandler />    
</div>
