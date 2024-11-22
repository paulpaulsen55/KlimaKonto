<script lang="ts">
    import BackgroundTriangles from "$lib/components/BackgroundTriangles.svelte";
</script>

<div class="relative overflow-hidden">
    <BackgroundTriangles />
    <div class="w-screen h-screen grid grid-rows-4 p-12 bg-dark-olive">
        <div class="row-span-2 flex justify-center items-center">
            <img src="/Erde.png" alt="earth" class="w-56 z-10"/>
        </div>
        <div class="row-span-2 flex flex-col justify-center items-start text-left z-10">
            <h1 class="text-4xl font-bold text-light-olive mb-4">CO<sub>2</sub>ntrol</h1>
            <p class="font-bold text-light-olive mb-6">Time for change</p>
            <div class="flex flex-col space-y-4 w-full">
                <a class="w-full font-bold text-center py-2 px-4 rounded bg-olive text-light-olive" href="/login">Login</a>
                <a class="w-full font-bold text-center py-2 px-4 rounded bg-light-olive text-black" href="/register">Register</a>
            </div>        
        </div>
    </div>
</div>
