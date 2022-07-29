'use babel';

import AztecSlotView from './aztec-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  aztecSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aztecSlotView = new AztecSlotView(state.aztecSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aztecSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aztec-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aztecSlotView.destroy();
  },

  serialize() {
    return {
      aztecSlotViewState: this.aztecSlotView.serialize()
    };
  },

  toggle() {
    console.log('AztecSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
