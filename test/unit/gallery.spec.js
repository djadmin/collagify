describe("Image Gallery", function() {
	it("should load 9 images", function() {
		var list = app.__testonly__.getGalleryImages(), images = list.images;
		expect(images.length).toBe(9);
	});

	it("should be draggable", function() {
		var list = app.__testonly__.constructGalleryImages();
		var images = list.querySelectorAll('img');
		for (var i = 0; i < images.length; i++) {
			var img = images[i];
			expect(img.getAttribute("draggable")).toBe('true');
		}
	});
});