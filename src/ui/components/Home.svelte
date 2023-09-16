<script>
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
    }

    function toggleNewProjectForm() {
        document.querySelector('#new-project-form').classList.toggle('hidden')
    }
</script>

<div class="m-3">
    <h1 class="font-medium">Welcome</h1>

    <div class="flex gap-5 mt-3">
        <h3 class="">Your projects</h3>
    
        <button on:click={toggleNewProjectForm}>New</button>
    </div>
    
    <div id="new-project-form" class="hidden">
        <NewProjectForm />
    </div>
    
    <div>
        {#each Object.keys(projects) as projectName}
            <button on:click={openProject} data-project="{projectName}" class="flex">
                <p class="me-3">{projectName}</p>
                <span>{projects[projectName]}</span>
            </button>
        {/each}
    </div>

    <h1 class="font-medium mt-3 mb-2">Customization</h1>
    
    <ModeHandler />    
</div>
