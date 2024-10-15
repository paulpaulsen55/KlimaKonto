<div class="relative overflow-hidden">
    <div class="background-image tri1">
        <img src="/tri_happy.png" alt="happy triangle" />
      </div>
      <div class="background-image tri2">
        <img src="/tri_unhappy.png" alt="unhappy triangle" />
      </div>
      <div class="background-image tri3">
        <img src="/tri_mad.png" alt="happy triangle" />
      </div>
    <div class="w-screen h-screen grid grid-rows-4 p-12 bg-dark-olive">
        <div class="row-span-2 flex justify-center items-center">
            <img src="/Erde.png" alt="earth" class="w-56"/>
        </div>
        <div class="row-span-2 flex flex-col justify-center items-start text-left">
            <h1 class="text-4xl font-bold text-light-olive mb-4">CO<sub>2</sub>ntrol</h1>
            <p class="font-bold text-light-olive mb-6">Time for change</p>
            <div class="flex flex-col space-y-4 w-full">
                <button class="w-full font-bold py-2 px-4 rounded bg-olive text-light-olive" on:click={() => {window.location.href = '/auth';}}>Login</button>
                <button class="w-full font-bold py-2 px-4 rounded bg-light-olive text-black" on:click={() => {window.location.href = '/auth';}}>Register</button>
            </div>        
        </div>
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
      width: 10rem; 
      height: 3rem;
      opacity: 1;
      z-index: 1; 
    }
  
    .tri1 {
      top: 10%;
      left: 10%;
      animation: rotate 8s linear infinite;
    }
  
    .tri2 {
      top: 50%;
      left: 40%;
      animation: rotate 12s linear infinite;
    }
  
    .tri3 {
      top: 30%;
      left: 60%;
      animation: rotate 6s linear infinite;
    }
  </style>