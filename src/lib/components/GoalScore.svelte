<script lang="ts">
    export let goal: number;
    export let progress = 0;


</script>

<div
    class="relative bg-light-olive flex flex-col gap-3 justify-center items-center p-5 m-5 rounded-xl text-xl"
>
    <p>weekly goal:</p>
    <p>{"< " + goal}</p>
    <div
        class="h-10 w-full rounded-full bg-gradient-to-r from-[#59AD71] via-[#E5D28E] to-[#B55454]"
    ></div>
    <div class="absolute bottom-0 left-4 right-8">
        <svg
            width="14"
            height="45"
            viewBox="0 0 14 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="relative"
            style={"left:" + progress + "%;"}
        >
            <path d="M7 0L13.9282 45H0.0717969L7 0Z" fill="black" />
        </svg>
    </div>
</div>
