<script>
    export let code
    
    function formatCode(code) {
        return code.split('\n')
    }
</script>

{#each formatCode(code) as line}
    <p class="mb-1">{line}</p>
{/each}