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

    function openGithubLink() {
        window.link.open("https://github.com")
    }

    function openDiscordLink() {
        window.link.open("https://discord.gg/zRcc3RP2sF")
    }
</script>

<div class="m-3">
    <div class="flex items-center justify-center gap-4 w-full">
        <img src="./logo.png" alt="Paxo IDE" style="height: 75px; width: 75px;">
        <h1 class="font-bold" style="font-size: 48px;">Paxo IDE</h1>
    </div>

    <div class="grid grid-rows-2 grid-cols-2 gap-4 mt-3">
        <div class="p-2 row-span-2">
            <h1 class="font-medium mb-3">Welcome</h1>

            <div class="flex gap-5">
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
                    <div class="flex items-center gap-3">
                        <button on:click={openProject} data-project="{projectName}" class="flex items-center text-sm" style="width: 100%;">
                            <p class="me-3">{projectName}</p>
                            <span dir="rtl" class="overflow-hidden" style="white-space: nowrap;
                            text-overflow: ellipsis;">{projects[projectName]}</span>
                        </button>
                        <button on:click={deleteProject} data-project="{projectName}" title="Delete project">
                            <FolderX />
                        </button>
                    </div>
                {/each}
            </div>
        </div>
        
        <div class="p-2">
            <h1 class="font-medium mb-3">Customization</h1>
            <ModeHandler />
        </div>

        <div class="p-2">
            <h1 class="font-medium mb-3">Contribute</h1>
            <p class="text-sm">This software is open-source, like all projects of Paxo. You can contribute to the development of these softwares on our <button on:click={openGithubLink}>GitHub</button> and on our <button on:click={openDiscordLink}>Discord</button>.</p>
        </div>
    </div>
</div>
