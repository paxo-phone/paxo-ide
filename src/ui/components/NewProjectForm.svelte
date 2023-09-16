<script>
    const fields = {
        name: "required",
        author: "required",
        authorContact: "required",
        link: "",
        version: "required",
        apiVersion: "required",
        licence: "required",
        storage: "",
        external: "", 
        internetRestricted: "",
        internet: "",
        messages: "",
        notifications: "",
    }

    function slugify(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function createProject() {
        let data = {}

        Object.keys(fields).forEach(key => {
            data[key] = document.querySelector(`#${key}`).value
        })
        console.log(data)
        window.fs.newFolder(`${window.fs.homeDir}/paxoProjects/${slugify(data["name"])}`)
        window.fs.newFile(
            `${window.fs.homeDir}/paxoProjects/${slugify(data["name"])}/conf.txt`, 
            `name=${data["name"]}\nauthorContact=${data["authorContact"]}\nlink=${data["link"]}\nversion=${data["version"]}\napiVersion=${data["apiVersion"]}\nlicense=${data["license"]}\nstorage=${data["storage"]}\nexternal=${data["external"]}\ninternetRestricted=${data["internetRestricted"]}\ninternet=${data["internet"]}\nmessages=${data["messages"]}\nnotifications=${data["notifications"]}\n`
        )
        window.location.reload()
    }
</script>

<div class="w-full">
    {#each Object.keys(fields) as field}
        <div class="flex w-full justify-between mt-2">
            <label for="{field}" class="w-1/5">{field}</label>
            <input type="text" id="{field}" placeholder="{field}" required={fields[field] === "required"} class="w-4/5">
        </div>
    {/each}
    <div class="w-full text-center">
        <button on:click={createProject} class="mt-3 mb-3">Create project</button>
    </div>
</div>
