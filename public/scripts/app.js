var app = (function() {

    var canvas;

    var _this = {}; //functions to be exposed

    _this.__testonly__ = {}; //functions to be tested

    function getGalleryImages() {
        // Mocking Data
        var baseUrl = "images/";

        var images = [{
            name: 'pic1.jpg',
            title: 'Nature'
        }, {
            name: 'pic2.jpg',
            title: 'Nature'
        }, {
            name: 'pic3.jpg',
            title: 'Flower'
        }, {
            name: 'pic4.jpg',
            title: 'Nature'
        }, {
            name: 'pic5.jpg',
            title: 'Bird'
        }, {
            name: 'pic6.jpg',
            title: 'Insect'
        }, {
            name: 'pic7.jpg',
            title: 'Flower'
        }, {
            name: 'pic8.jpg',
            title: 'Flower'
        }, {
            name: 'pic9.jpg',
            title: 'Tree'
        }];

        return {
            baseUrl: baseUrl,
            images: images
        };
    }

    /* test-code */
    _this.__testonly__.getGalleryImages = getGalleryImages;
    /* end-test-code */

    function constructGalleryImages() {
        var data = getGalleryImages();
        var baseUrl = data && data.hasOwnProperty('baseUrl') ? data.baseUrl : "";
        var images = data && data.hasOwnProperty('images') ? data.images : [];
        var count = 9 || images.length; //@change
        var list = document.createElement('ul');
        for (var i = 0; i < count; i++) {
            var imgContainer = document.createElement('li');
            //  data-toggle="tooltip" title="Double Click or Move" data-placement="bottom"
            imgContainer.setAttribute("data-toggle", "tooltip");
            imgContainer.setAttribute("title", "Double Click or Drag to Move");
            imgContainer.setAttribute("data-placement", "bottom");
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

    /* test-code */
    _this.__testonly__.constructGalleryImages = constructGalleryImages;
    /* end-test-code */

    function loadGalleryImages() {
        var images = constructGalleryImages();
        var obj = document.getElementById('gallery-list');
        images && obj.appendChild(images);
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
            //  Prevent any non-image file type from being read.
            if (!src.type.match(/image.*/)) {
                return;
            }

            //  Create our FileReader and run the results through the render function.
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

    function addImageToWorkSpace(src, x, y) {
        fabric.Image.fromURL(src, function(oImg) {
            x = x || 0;
            y = y || 0;
            oImg.set({
                left: x,
                top: y,
                angle: 0,
                opacity: 1,
                 originX: 'left', originY: 'top',
                 borderColor: '#50A5ED',
                 cornerColor: '#50A5ED',
                 cornerSize: 6,
                 transparentCorners: false
            });

            canvas.add(oImg); //.setActiveObject(oImg);
        });
    }

    function bindGalleryEvents() {

        function startDrag(e) {
            var imageSrc = this.src;
            e.dataTransfer.setData('text/plain', imageSrc);
        }

        function doDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }

        function doDrop(e) {
            e.preventDefault();
            var imageSrc = e.dataTransfer.getData('text/plain');
        }

        function doDblClick(e) {
            var imageSrc = e.target.src;
            addImageToWorkSpace(imageSrc, 0, 0);
        }

        var images = document.querySelectorAll('#gallery-list ul li img');
        var len = images.length;
        for (var i = 0; i < len; i++) {
            var img = images[i];
            img.addEventListener('dragstart', startDrag);
            // img.addEventListener('dragover', doDragOver);
            // img.addEventListener('drop', doDrop);
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
                posX = e.layerX - $(e.target).position().left;
                posY = e.layerY - $(e.target).position().top;
                addImageToWorkSpace(imageSrc, posX, posY);
            }

        var other = document.getElementsByClassName('upper-canvas')[0];
        other.addEventListener('dragover', doDragOver);
        other.addEventListener('drop', doDrop);

        canvas.on({
            'object:moving': function(e) {
                e.target.opacity = 0.7
            },
            'object:modified': function(e) {
                e.target.opacity = 1;
            }
        });

    }

    function bindDragDropEvents() {
        bindGalleryEvents();
        bindCanvasEvents();
    }


    function resizeCanvas() {
      canvas.setWidth(document.getElementById('workspace-cont').offsetWidth);
      canvas.renderAll();
    }

    function initializeCanvas() {
        canvas = new fabric.Canvas('workspace', {
            backgroundColor: "#fff",
            hoverCursor: 'pointer'
        });
        window.addEventListener('resize', resizeCanvas, false);
        // resize on init
        resizeCanvas();
    }

    function removeActiveObject(e) {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            e.preventDefault();
            canvas.remove(activeObj);
        }
    }

    function keyDownHandler(e) {
        var key = e.keyCode;
        if (key === 46 || key === 8) { // Capture Delete Key
            removeActiveObject(e);
        }
    }

    function bindKeyListeners() {
        document.onkeydown = keyDownHandler;
    }

    function bindButtonListeners() {

        function bindSave() {
            var dataUrl = canvas.toDataURL("");
            this.href = dataUrl;
            this.download = "MyCanvas.jpg";
        }

        function bindClear() {
            $("#clearConfirmModal").modal('show');
            $("#clearConfirmModal #delete").one('click', function() {
                canvas.clear();
            });
        }

        var save = document.getElementById('saveBtn');
        save.addEventListener('click', bindSave);
        
        var clear = document.getElementById('clearBtn');
        clear.addEventListener('click', bindClear);
    }

    function bindToolTip() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    function bindEvents() {
        // bindImageUpload();
        bindDragDropEvents();
        bindKeyListeners();
        bindButtonListeners();
        bindToolTip();
    }

    function init() {
        initializeCanvas();
        loadGalleryImages();
        bindEvents();
    }

    _this.init = init;

    return _this;
})();

(function() {
    function init() {
        app.init();
    }
    window.addEventListener("load", init, false);
})();