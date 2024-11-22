<script lang="ts">
    const triangles = [
        { src: '/tri_happy.png', baseTop: 1, baseLeft: 5, animationDuration: 8 },
        { src: '/tri_happy.png', baseTop: 5, baseLeft: 70, animationDuration: 12 },
        { src: '/tri_happy.png', baseTop: 20, baseLeft: 10, animationDuration: 6 },
        { src: '/tri_unhappy.png', baseTop: 50, baseLeft: 10, animationDuration: 8 },
        { src: '/tri_unhappy.png', baseTop: 40, baseLeft: 50, animationDuration: 12 },
        { src: '/tri_unhappy.png', baseTop: 60, baseLeft: 70, animationDuration: 16 },
        { src: '/tri_mad.png', baseTop: 80, baseLeft: 70, animationDuration: 12 },
        { src: '/tri_mad.png', baseTop: 30, baseLeft: 70, animationDuration: 8 },
        { src: '/tri_mad.png', baseTop: 90, baseLeft: 10, animationDuration: 6 },
    ];
    const randomOffset = () => Math.random() * 10 - 5; // +/-5%

    triangles.forEach(triangle => {
        triangle.offsetTop = triangle.baseTop + randomOffset();
        triangle.offsetLeft = triangle.baseLeft + randomOffset();
    });
</script>

<div class={$$props.class}>
    {#each triangles as triangle}
        <img
            class="background-image"
            src="{triangle.src}"
            alt="triangle"
            style="top: {triangle.offsetTop}%; left: {triangle.offsetLeft}%; animation-duration: {triangle.animationDuration}s;"
        />
    {/each}
    <slot />
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
        animation: rotate linear infinite;
    }
</style>