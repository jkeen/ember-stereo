import Component from '@glimmer/component';

export default class DocsStereoPlayerExampleComponent extends Component {
  // BEGIN-SNIPPET stereo-player-example-controller.js
  onDemandUrl = "https://audio.wnyc.org/otm/otm04212017pod.mp3"
  onDemandOgg = "https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"

  streamUrl = "https://streaming.koop.org/stream.mp3"

  // END-SNIPPET
}
