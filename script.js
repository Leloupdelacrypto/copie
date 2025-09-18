document.addEventListener('DOMContentLoaded',()=>{
  const tracks=document.querySelectorAll('.carousel__track');
  tracks.forEach(track=>{
    let index=0;
    setInterval(()=>{
      index=(index+1)%track.children.length;
      track.style.transform=`translateX(-${index*100}%)`;
    },4000);
  });

  // Testimonials with dots
  const tTrack=document.querySelector('.testimonial-track');
  const tDots=document.querySelector('.testimonial-dots');
  const quotes=tTrack?Array.from(tTrack.children):[];
  let tIndex=0;
  quotes.forEach((_,i)=>{
    const b=document.createElement('button');
    if(i===0)b.classList.add('active');
    b.addEventListener('click',()=>{
      tIndex=i;
      update();
    });
    tDots.appendChild(b);
  });
  function update(){
    tTrack.style.transform=`translateX(-${tIndex*100}%)`;
    tDots.querySelectorAll('button').forEach((b,i)=>{
      b.classList.toggle('active',i===tIndex);
    });
  }
  setInterval(()=>{tIndex=(tIndex+1)%quotes.length;update();},5000);
});