


//<=============  medisin one colume =================>
const swiper = new Swiper('.brand-slider', {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 5000,
      },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      450: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      991: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 40
      }
    }
  });


       //<=============  zoomsl gallry =================>
// $(function() {
//   $(".xzoom, .xzoom-gallery").xzoom({
//     zoomWidth:400,
//     tint:"#333",
//     Xoffset:15,
//   })
// });

// $(function(){
//   $(".xzoom").elevateZoom({
//     scrollZoom : true,
//     tint:true, tintColour:'green', tintOpacity:0.5
//   });
//   // $(".xzoom").bind("click", function(e) {  
//   //   var ez =   $('.xzoom').data('elevateZoom');	
//   //   $.fancybox(ez.getGalleryList());
//   //   return false;
//   // })
// })




document.querySelectorAll('.xzoom-gallery').forEach(images =>{
  images.onclick =() =>{
    document.querySelector('.xzoom').src = images.getAttribute('src');
  }
})
// $(document).ready(function(){
//  $('.thumb-image img').click(function(){
//    var image = $(this).attr('src');
//    $('.xzoom img').attr('src',image);
//  })
// })
                   //=================== pass the images to Fancybox =================================
// $(".thumb-image").bind("click", function(e) {  
//   var ez =   $('.thumb-image').data('elevateZoom');	
// 	$.fancybox(ez.getGalleryList());
//   return false;
// });
