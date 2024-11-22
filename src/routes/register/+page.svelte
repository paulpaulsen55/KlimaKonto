<script lang="ts">
    import BackgroundTriangles from "$lib/components/BackgroundTriangles.svelte";
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<div class="relative overflow-hidden">
    <BackgroundTriangles />
    <div class="w-screen h-screen grid grid-rows-4 p-12 bg-dark-olive">
        <div class="row-span-2 flex justify-center items-center">
            <img src="/Erde.png" alt="earth" class="w-56 z-10"/>
        </div>
        <form method="POST" action="?/register" class="z-10">
            <div class="row-span-2 flex flex-col justify-center items-start text-left z-10">
                <p class="font-bold text-light-olive mb-6">Create your Account</p>
                <div class="flex flex-col space-y-4 w-full">
                    <label for="email">
                    <input id="email" type="email" class="w-full font-bold py-2 px-4 rounded bg-light-olive text-black" name="email" placeholder="E-Mail">
                    </label>
                    <label for="password">
                    <input id="password" type="password" minlength="8" class="w-full font-bold py-2 px-4 rounded bg-light-olive text-black" name="password" placeholder="Password">
                    </label>
                    <button class="w-full font-bold py-2 px-4 rounded bg-olive text-light-olive">Register</button>
                    {#if form?.error}	
                    <div class="bg-red-500 text-white p-4 rounded mb-4">
                        <p>{form.error}</p>
                    </div>
                    {/if}
                    <p class="font-bold text-light-olive mb-6">
                        Already have an Account? 
                        <a class="underline text-bg-olive" href="/login">Login</a>
                    </p>
                </div>        
            </div>
        </form>
    </div>
</div>
