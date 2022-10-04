
var app = document.getElementById('appIframe');
$('.bikeBtnsColor').click(function(){
    $('.bikeBtnsColor').removeClass('active');
    $(this).addClass('active');
})
$('.bikeBtnsBg').click(function(){
    $('.bikeBtnsBg').removeClass('active');
    $(this).addClass('active');
})

var website_link =  window.location.href.split('?')[0];
console.log(website_link);

var loadFile = function(event) {
    // var modalImg = document.getElementById('modalImg');
    // modalImg.src = URL.createObjectURL(event.target.files[0]);

    app.contentWindow.postMessage('ImageLOAD', '*');
    var outputImg = document.getElementById('outputImg');
    outputImg.src = URL.createObjectURL(event.target.files[0]);
    submitfrom(1);
    
            document.getElementsByClassName('closeCanvasBtn')[0].click();
    outputImg.onload = function() {
      URL.revokeObjectURL(outputImg.src) // free memory
    }
};
function loadAR(){
    app.contentWindow.postMessage('LOADARCAR', '*');
    
    document.getElementById('ar').style.display= "none"  ;
    document.getElementById('arclose').style.display= "flex";
    window.XRIFrame.registerXRIFrame('appIframe')


}
function closeAR(){
    
            document.getElementsByClassName('closeCanvasBtn')[0].click();
    document.getElementById('ar').style.display= "flex"  ;
    document.getElementById('arclose').style.display= "none";
    app.contentWindow.postMessage('CloseAR', '*');


}

function sendmessage(){
    app.contentWindow.postMessage('ImageLOAD', '*');
}

function takescreenshot(){
    app.contentWindow.postMessage('takescreenshot', '*');
}

function submitfrom(num)
{
    var file_data = $("#input").prop("files")[0]; // Getting the properties of file from file field
    var form_data = new FormData($('#myform')[0]); // Creating object of FormData class
    imageId = 1;
    
    form_data.append("image", file_data) // Appending parameter named file with properties of file_field to form_data
    // console.log('form data', form_data);
    // return false;
    $.ajax({
    url: 'UploadApi/public/api/upload',
    // url: website_link + 'UploadApi/public/api/upload',
    // headers: {'X-CSRF-TOKEN': $('input[name="_token"]').val()},
    type: 'POST',
    contentType: false,
    processData: false,
    cache: false,
    // dataType: "jsonp",
    data: form_data,
        headers: {
            // 'X-CSRF-TOKEN': $('input[name="_token"]').val(),
            // "accept": "application/json",
            // "Access-Control-Allow-Origin":"*"
        },
        // async:true,
        // dataType : 'jsonp',   //you may use jsonp for cross origin request
        // crossDomain:true,
        beforeSend:function()
        {
            $("#loader").css('display', 'block');
           // $('body').css('opacity', 0.5);
        //   app.contentWindow.postMessage('LoadStart:', '*');
           
        },
        success: function(data) {
            console.log(data);
            const obj = JSON.parse(data);
            console.log(obj);
            $("#colorCode").css('background-color', $("#color-picker").val());
            // $("#image"+imageId).attr('src', obj[0].data.image_url);
            // $("#boxImages").append('<img src="'+obj[0].data.image_url+'" style="width:100%"> <br>');
            // if(imageId == 1){ $("#image1").attr('src', obj[0].data.image_url);  }
            // if(imageId == 2){ $("#image2").attr('src', obj[0].data.image_url);  }
            // if(imageId == 3){ $("#image3").attr('src', obj[0].data.image_url);  }
            app.contentWindow.postMessage('ImageURL:'+obj.image_url, '*');
            document.getElementsByClassName('closeCanvasBtn')[0].click();
            
            $("#loader").css('display', 'none');
        },
        error: function(data) {
            console.log(data);
        }
    });
}
function downloadFile(elmnt) {
  
  const link = elmnt
  const url = 'https://cdn.8thwall.com/image-target/paperlegend/389a67f0-ddd1-41e8-bc06-e697b630e29b'
const options = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
  
 fetch(url, options)
  .then( response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "ArImage.jpg";
        a.click();
      });
    }); 
}
