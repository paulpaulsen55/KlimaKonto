<script lang="ts">
    import { invalidate } from "$app/navigation";
    import type { PageData } from "./$types";
    import GoalScore from "$lib/components/GoalScore.svelte";

    export let data: PageData;

    $: ({ goal, score, userActions } = data);

    $: progress = (score / goal) * 100 > 100 ? 100 : (score / goal) * 100;
</script>

<body class="flex flex-col text-white h-full">
    <GoalScore {goal} bind:progress />
    <div class="flex flex-col items-center justify-center h-full">
        <h2 class="font-bold text-4xl">SCORE</h2>
        <h1
            style="color: {`hsl(${120 - progress * 1.2}, 60%, 50%)`}"
            class="font-extrabold text-7xl"
        >
            {score}
        </h1>
        <p>{Math.ceil((7 - new Date().getDay()) % 7)} days remaining</p>
    </div>
    <div>
        <ul class="p-5 my-auto">
            {#each userActions as userAction}
                <li class="flex items-center justify-between gap-5">
                    <p class="text-xl truncate" title={userAction.actions.name}>
                        {userAction.actions.name}
                    </p>
                    <span class="text-md text-olive"
                        >{new Date(userAction.created_at).toLocaleDateString(
                            "de-DE",
                        )}</span
                    >
                </li>
            {/each}
        </ul>
    </div>
</body>
