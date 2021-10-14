import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class ModalMixin extends Vue {
  protected isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
