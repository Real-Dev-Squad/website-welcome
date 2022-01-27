import Component from '@glimmer/component';
import Cropper from 'cropperjs';
import { action } from '@ember/object';

export default class ImageCropperComponent extends Component {
  currentImageCropCordinates = null;

  get image() {
    if (this.cropper) {
      this.cropper.destroy();
    }
    return this.args.image;
  }

  @action loadCropper() {
    const image = document.getElementById('image-cropper');
    this.cropper = new Cropper(image, {
      autoCrop: true,
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 1,
      cropBoxResizable: true,
      movable: false,
      zoomOnWheel: false,
      rotatable: false,
      toggleDragModeOnDblclick: false,
      preview: '.image-cropper-preview',
      ready: () => {
        this.setImageData();
      },
      cropend: () => {
        this.setImageData();
      },
    });
  }

  setImageData() {
    this.cropper.getCroppedCanvas().toBlob((blob) => {
      this.args.setImageData(blob);
    }, this.args.imageType);
  }
}
