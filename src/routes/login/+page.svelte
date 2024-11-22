<script lang="ts">
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<div class="relative overflow-hidden">
    <img class="background-image tri1" src="/tri_happy.png" alt="happy triangle" />
    <img class="background-image tri2" src="/tri_happy.png" alt="happy triangle" />
    <img class="background-image tri3" src="/tri_happy.png" alt="happy triangle" />
    <img class="background-image tri4" src="/tri_unhappy.png" alt="unhappy triangle" />
    <img class="background-image tri5" src="/tri_unhappy.png" alt="unhappy triangle" />
    <img class="background-image tri6" src="/tri_unhappy.png" alt="unhappy triangle" />
    <img class="background-image tri7" src="/tri_mad.png" alt="mad triangle" />
    <img class="background-image tri8" src="/tri_mad.png" alt="mad triangle" />
    <img class="background-image tri9" src="/tri_mad.png" alt="mad triangle" />
    <div class="w-screen h-screen grid grid-rows-4 p-12 bg-dark-olive">
    <div class="row-span-2 flex justify-center items-center">
        <img src="/Erde.png" alt="earth" class="w-56 z-10"/>
    </div>
        <form method="POST" action="?/login" class="z-10">
            <div class="row-span-2 flex flex-col justify-center items-start text-left z-10">
                <p class="font-bold text-light-olive mb-6">Sign in to your Account</p>
                <div class="flex flex-col space-y-4 w-full">
                    <label for="email">
                    <input id="email" type="email" class="w-full font-bold py-2 px-4 rounded bg-light-olive text-black" name="email" placeholder="E-Mail">
                    </label>
                    <label for="password">
                    <input id="password" type="password" class="w-full font-bold py-2 px-4 rounded bg-light-olive text-black" name="password" placeholder="Password">
                    </label>
                    <button class="w-full font-bold py-2 px-4 rounded bg-olive text-light-olive">Login</button>
                    {#if form?.error}	
                    <div class="bg-red-500 text-white p-4 rounded mb-4">
                        <p>{form.error}</p>
                    </div>
                    {/if}
                    <p class="font-bold text-light-olive mb-6">Need an Account? <a class="underline text-bg-olive" href="/register">Register</a></p>
                    <a class="font-bold underline text-light-olive" href="/">Home</a>
                </div>        
            </div>
        </form>
    </div>
</div>

<style>
    @keyframes rotate {
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(360deg);
        }
    }

    .background-image {
        position: absolute;
        width: 5rem; 
        height: 5rem;
        opacity: 1;
        z-index: 1; 
    }

    .tri1 {
        top: 1%;
        left: 5%;
        animation: rotate 8s linear infinite;
    }

    .tri2 {
        top: 5%;
        left: 70%;
        animation: rotate 12s linear infinite;
    }

    .tri3 {
        top: 20%;
        left: 10%;
        animation: rotate 6s linear infinite;
    }

    .tri4 {
        top: 50%;
        left: 10%;
        animation: rotate 8s linear infinite;
    }

    .tri5 {
        top: 40%;
        left: 50%;
        animation: rotate 12s linear infinite;
    }

    .tri6 {
        top: 60%;
        left: 70%;
        animation: rotate 16s linear infinite;
    }

    .tri7 {
        top: 80%;
        left: 70%;
        animation: rotate 12s linear infinite;
    }

    .tri8 {
        top: 30%;
        left: 70%;
        animation: rotate 8s linear infinite;
    }

    .tri9 {
        top: 90%;
        left: 10%;
        animation: rotate 6s linear infinite;
    }
</style>