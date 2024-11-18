<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ userActions } = data);
</script>

<div>
    {#each userActions as userAction}
        <p>{userAction.user_id.display_name} - {userAction.score}</p>
    {/each}
</div>
