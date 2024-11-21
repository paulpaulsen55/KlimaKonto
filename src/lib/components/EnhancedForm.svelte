<script lang="ts">
    import { enhance } from "$app/forms";
    import { Spinner } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    export let action: string;
    export let error: string = "";
    
    const dispatch = createEventDispatcher();

    let loading: boolean;
</script>


{#if loading}
    <div class="z-20 fixed inset-0 grid place-content-center bg-black bg-opacity-80" transition:fade>
    <Spinner size="20"/>
  </div>
{/if}
<form method="post" {action} class={$$props.class} use:enhance={() => {
    loading = true;
    return async ({ update, result,action }) => {
        loading = false;
        update({reset: false});
        if (result.type === "success" && result.data) dispatch("complete", result.data.success);
    };
}}>
    <slot />
    {#if error !== ""}	
        <div class="bg-red-500 text-white p-4 rounded mt-4 w-full">
            <p>{error}</p>
        </div>
    {/if}
</form>

