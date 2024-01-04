<script>
    const fields = [
        { name: "name", required: true, type: "text" },
        { name: "author", required: true, type: "text" },
        { name: "authorContact", required: true, type: "email" },
        { name: "link", required: false, type: "text" },
        { name: "version", required: true, type: "text" },
        { name: "apiVersion", required: true, type: "text" },
        { name: "license", required: true, type: "text" },
        { name: "storage", required: false, type: "checkbox" },
        { name: "external", required: false, type: "checkbox" }, 
        { name: "internetRestricted", required: false, type: "checkbox" },
        { name: "internet", required: false, type: "checkbox" },
        { name: "messages", required: false, type: "checkbox" },
        { name: "notifications", required: false, type: "checkbox" },
    ]

    function slugify(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function createProject() {
        let data = { permissions: [] }

        fields.forEach(field => {
            if (field.type === "checkbox") {
                document.querySelector(`#${field.name}`).checked ? data['permissions'].push(field.name) : null
            } else {
                data[field.name] = document.querySelector(`#${field.name}`).value
            }
        })

        window.fs.newFolder(`${window.fs.homeDir}/paxoProjects/${slugify(data["name"])}`)
        window.fs.newFile(
            `${window.fs.homeDir}/paxoProjects/${slugify(data["name"])}/config.toml`, 
            `title = "${data["name"]}"\n
[app_info]
name = "${data["name"]}"
version = "${data["version"]}"
api_version = "${data["apiVersion"]}"
license = "${data["license"]}"

[author]
author = "${data["author"]}"
author_contact = "${data["author"]} <${data["authorContact"]}>"
link = "${data["link"]}"

permissions = [ "${data["permissions"].join('", "')}" ]
\n`
        )

        window.fs.newFile(
            `${window.fs.homeDir}/paxoProjects/${slugify(data["name"])}/main.lua`,
            `-- created by ${data["author"]} <${data["authorContact"]}>\n\n
function run()
    window = gui:window()
    gui:setWindow(window)
end\n`
        )

        window.location.reload()
    }
</script>

<div class="w-full">
    {#each fields as field}
        <div class="flex w-full justify-between mt-2">
            <label for="{field.name}" class="w-1/5">{field.name}</label>
            <input type="{field.type}" id="{field.name}" placeholder="{field.name}" required="{field.required}" class="w-4/5">
        </div>
    {/each}
    <div class="w-full text-center">
        <button on:click={createProject} class="mt-3 mb-3">Create project</button>
    </div>
</div>
