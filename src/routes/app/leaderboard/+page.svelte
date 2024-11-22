<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ userActions } = data);
</script>

<div class="text-light-olive">
    <div class="bg-light-olive bg-opacity-25 flex flex-col items-center m-5 p-5 rounded-xl">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="189"
            height="154"
            fill="none"
            ><path
                fill="#85B386"
                stroke="#E7F0DC"
                stroke-linejoin="round"
                stroke-width="13"
                d="M28.448 147.324 6.532 46.513l43.831 21.915L94.194 7.065l43.831 61.363 43.832-21.915-21.916 100.811H28.448Z"
            /><path
                fill="#E7F0DC"
                d="M88.313 118V88.437a13.85 13.85 0 0 1-4.063 2.376 28.814 28.814 0 0 1-4.125 1.25v-8.438c2.083-.625 4.104-1.604 6.063-2.938 2-1.333 3.666-2.854 5-4.562h5.75V118h-8.626Zm-8.563 0v-7.688h25.812V118H79.75Z"
            /></svg
        >
        <h2 class="font-bold text-2xl">{userActions[0].user_id.display_name}</h2>
        <p>{userActions[0].score} points</p>
    </div>

    <div class="bg-light-olive bg-opacity-25 flex flex-col items-center m-5 p-5 rounded-xl divide-y-2">
        {#each userActions.slice(1) as userAction, i}
            <div class="grid grid-flow-col w-full py-2">
                <h1 class="font-extrabold text-4xl">{i + 2}.</h1>
                <h3 class="grid place-content-center text-xl font-bold">{userAction.user_id.display_name}</h3>
                <p class="grid place-content-center">{userAction.score} Points</p>
            </div>
        {/each}
    </div>
</div>
