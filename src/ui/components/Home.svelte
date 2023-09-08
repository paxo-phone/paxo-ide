<script>
    import {projectStore} from "../store"

    $projectStore

    const projects = window.fs.readExistingProjects(window.fs.homeDir)

    function openProject(e) {
        let projectName = e.srcElement.parentElement.dataset.project
        projectStore.set({
            projectName: projectName,
            projectPath: projects[projectName]
        })
    }
</script>

<h1 class="font-medium">Welcome</h1>

<h3>Your projects</h3>

<div>
    {#each Object.keys(projects) as projectName}
        <button on:click={openProject} data-project="{projectName}" class="flex">
            <p class="me-3">{projectName}</p>
            <span>{projects[projectName]}</span>
        </button>
    {/each}
</div>
