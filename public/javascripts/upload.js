$(function() {
  $('#submit').click(function() {
    // FormData の作成
    var form = $('#ajaxform').get()[0];
    var formData = new FormData(form);

    // FormData を送信
    $.ajax('/upload', {
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
      error: function() {
        console.log('error');
      },
      success: function(res) {
        console.log(res);
        $('#image_place').append($('<img>').attr('src', res.fileName).attr('width', "100"));
      }
    });

    return false;
  });

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
        console.log('アップロードに失敗しました');
      },
      success: function(res) {
        console.log('アップロードに成功しました');
        $('#image_place').append($('<img>').attr('src', res.fileName).attr('width', "100"));
      }
    });

    return false;
  }); 
});


