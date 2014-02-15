$(function() {
  /// for Ajax
  $('#submit').click(function() {
    var form = $('#ajaxform').get()[0];
    var formData = new FormData(form);

    $.ajax('/upload', {
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
      error: function() {
        console.log('upload error');
      },
      success: function(res) {
        addImage(res.fileName);
      }
    });

    return false;
  });

  /// for D&D
  var $dropzone = $("#dropzone");

  // File API が使用できない場合は諦めます.
  if(!window.FileReader) {
    alert("File API がサポートされていません。");
    return false;
  }

  // イベントをキャンセルするハンドラです.
  var cancelEvent = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  // dragenter, dragover イベントのデフォルト処理をキャンセルします.
  $dropzone.bind("dradenter", cancelEvent);
  $dropzone.bind("dragover", cancelEvent);

  $dropzone.on('drop', function(event) {
    var file = event.originalEvent.dataTransfer.files[0];
    var formData = new FormData();
    formData.append('file', file);

    $.ajax('/upload', {
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
      error: function() {
        console.log('upload error');
      },
      success: function(res) {
        addImage(res.fileName);
      }
    });

    return false;
  }); 

  function addImage(fileName){
    $('#image_place').append(
        $('<div>').addClass("col-xs-6 col-md-3").append(
          $('<a>').attr("href","#").addClass("thumbnail").append(
            $('<img>').attr('src', fileName))));
  }


});


