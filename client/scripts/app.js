var app = (function() {

    var canvas;

    function getGalleryImages() {
        // Mocking Data
        var baseUrl = "./images/";

        var images = [{
            name: 'pic1.jpg',
            title: 'Nature'
        }, {
            name: 'pic2.jpg',
            title: 'Nature'
        }, {
            name: 'pic3.jpg',
            title: 'Nature'
        }, {
            name: 'pic4.jpg',
            title: 'Nature'
        }, {
            name: 'pic5.jpg',
            title: 'Animal'
        }, {
            name: 'pic6.jpg',
            title: 'Insect'
        }, {
            name: 'pic7.jpg',
            title: 'Bird'
        }, {
            name: 'pic8.jpg',
            title: 'Insect'
        }];

        return {
            baseUrl: baseUrl,
            images: images
        };
    }

    function constructGalleryImages() {
    	var data = getGalleryImages();
    	var baseUrl = data && data.hasOwnProperty('baseUrl') ? data.baseUrl : "";
    	var images = data && data.hasOwnProperty('images') ? data.images : [];
    	var count = 10 || images.length; //@change
    	var list = document.createElement('ul');
    	for (var i = 0; i < count; i++) {
    		var imgContainer = document.createElement('li');
    		var img = document.createElement('img');
    		//Set Image source
    		if (images[i]) {
    			var url = baseUrl + (images[i].hasOwnProperty('name') ? images[i].name : "");
    			var title = images[i].hasOwnProperty('title') ? images[i].title : "";
    			img.setAttribute("src", url);
    			img.setAttribute("title", title);
    			img.setAttribute("draggable", true);
    		}
    		imgContainer.appendChild(img);
    		list.appendChild(imgContainer);
    	}
    	return list;

    }

    function loadGalleryImages() {
    	var images = constructGalleryImages();
    	var obj = document.getElementById('gallery-list');
    	images && obj.appendChild(images);
    }

    function fabricTest2() {
        fabric.Image.fromURL('my_image.png', function(oImg) {
          // scale image down, and flip it, before adding it onto canvas
          oImg.scale(0.5).setFlipX(true);
          canvas.add(oImg);
        });
    }

    function fabricTest() {
        var canvas = new fabric.Canvas('workspace');
        var imgElement = document.getElementById('img-1');
        var imgInstance = new fabric.Image(imgElement, {
            left: 100,
            top: 100,
            angle: 0,
            opacity: 1
        });
        canvas.add(imgInstance);
    }

    function drawOnCanvas() {
        var ctx = getWorkSpace();
        ctx.fillStyle = 'red';
        ctx.fillRect(100, 100, 50, 50);
    }

    function getWorkSpace() {
    	return document.getElementById('workspace');
    	// return canvas;
    }

    function getWorkSpaceContext() {
    	var workspace = getWorkSpace();
        return workspace && workspace.getContext("2d");
    }

    function addImageToGallery() {

    }

    function bindImageUpload() {

        function loadImage(src) {
            //	Prevent any non-image file type from being read.
            if (!src.type.match(/image.*/)) {
                return;
            }

            //	Create our FileReader and run the results through the render function.
            var reader = new FileReader();
            reader.onload = function(e) {
                render(e.target.result);
            };
            reader.readAsDataURL(src);
        }

        function bindUploadBtn() {
            

        }

        function bindUploadArea() {

            //Upload Image
            var uploadBtn = document.getElementById('uploadBtn');
            uploadBtn.addEventListener("change", bindUploadBtn);


            //Drag and Drop Image
            var uploadArea = document.getElementById('uploadArea');
            // uploadArea.addEventListener('click', bindUploadArea);
            uploadArea.addEventListener("dragover", function(e) {
                e.preventDefault();
            }, true);
            uploadArea.addEventListener("drop", function(e) {
                e.preventDefault();
                loadImage(e.dataTransfer.files[0]);
            });
        }
    }

    function display() {
        var reader = new Reader();
        reader.onload = onImage
    }

    //@Deprecated
  /*  function addImgToWorkSpace(src, x, y) {
    	var ctx = getWorkSpaceContext();
    	var img = new Image();
    	img.addEventListener('load', function() {
    		ctx.drawImage(img, x, y);
    	}, false);
    	img.src = src;
    }*/

    function addImageToWorkSpace(src, x, y) {
    	var canvas = new fabric.Canvas('workspace');
    	fabric.Image.fromURL(src, function(oImg) {
    	  // scale image down, and flip it, before adding it onto canvas
    	  // oImg.scale(0.5).setFlipX(true);
    	  oImg.set({
    	  	left: x,
    	  	top: y,
    	  	angle: 0,
    	  	opacity: 1
    	  });
    	  canvas.add(oImg);
    	});
    }

    function bindGalleryEvents() {

    	function startDrag(e) {
    		var imageSrc = this.src;
    		// e.dataTransfer.setData('image', this);
    		e.dataTransfer.setData('text/plain', imageSrc);
    	}

    	function doDragOver(e) {
    		e.preventDefault();
    	}

    	function doDrop(e) {
    		e.preventDefault();
    		// var img = e.dataTransfer.getData('image');
    		var imageSrc = e.dataTransfer.getData('text/plain');
    	}

    	function doDblClick(e) {
    		var imageSrc = e.target.src;
    		// addImageToWorkSpace(imageSrc, 0, 0);
    		
    		// Temp
    		// var canvas = new fabric.Canvas('workspace');
    		fabric.Image.fromURL(imageSrc, function(oImg) {
    			oImg.set({left: 0, top: 0});
    		  canvas.add(oImg);
    		});
    	}

    	var images = document.querySelectorAll('#gallery-list ul li img');
    	var len = images.length;
    	for (var i = 0; i < len; i++) {
    		var img = images[i];
    		img.addEventListener('dragstart', startDrag);
    		img.addEventListener('dragover', doDragOver);
    		img.addEventListener('drop', doDrop);
    		img.addEventListener('dblclick', doDblClick);
    	}
    }

    function bindCanvasEvents() {

    	function doDragOver(e) {
    		e.preventDefault();
    	}

    	function doDrop(e) {
    		e.preventDefault();
    		var imageSrc = e.dataTransfer.getData('text/plain');
    		var posX = e.x;
    		var posY = e.y;
    		// posX = e.layerX - $(e.target).position().left;
			// posY = e.layerY - $(e.target).position().top;
    		addImageToWorkSpace(imageSrc, posX, posY);
    	}
    	var workspace = getWorkSpace();
    	workspace.addEventListener('dragover', doDragOver);
    	workspace.addEventListener('drop', doDrop);

    	// var other = document.getElementsByClassName('upper-canvas')[0];
    	// other.addEventListener('dragover', doDragOver);
    	// other.addEventListener('drop', doDrop);
    }

    function bindDragDropEvents() {
    	bindGalleryEvents();
    	bindCanvasEvents();
    }

    function fabricTest3() {
    	canvas = new fabric.Canvas('workspace');
    		fabric.Image.fromURL("images/pic1.jpg", function(oImg) {
    			oImg.set({left: 0, top: 0});
    		  canvas.add(oImg);
    		});
    }


    function removeActiveObject() {
    	var activeObj = canvas.getActiveObject();
    	if (activeObj) {
    		canvas.remove(activeObj);
    	}
    }

    function keyDownHandler(e) {
    	var key = e.keyCode;
    	if (key === 46 || key === 8) { // Delete Key
    		removeActiveObject();
    	}
    }

    function bindKeyListeners() {
    	document.onkeydown = keyDownHandler;
    }

    function init() {
        // bindImageUpload();
        loadGalleryImages();
        bindDragDropEvents();
        bindKeyListeners();
        // drawOnCanvas();
        // fabricTest2();
        fabricTest3();
    }

    return {
        init: init
    }
})();