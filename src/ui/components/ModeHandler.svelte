<script>
    import { onMount } from "svelte";

    let mode = ''

    onMount(async () => {
        mode = await window.darkMode.get() === 'dark' ? 'Dark' : 'Light'
    })

    async function toggleMode () {
        const isDarkMode = await window.darkMode.toggle()
        mode = await window.darkMode.get() === 'dark' ? 'Dark' : 'Light'
    }
</script>

<button on:click={toggleMode}>{mode}</button>
