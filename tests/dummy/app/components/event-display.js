import Component from "@glimmer/component";
import { EVENT_MAP, SERVICE_EVENT_MAP } from "ember-stereo/services/stereo";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from '@ember/service';
import { A as emberArray } from "@ember/array";
import { set } from "@ember/object";
import { task, didCancel } from 'ember-concurrency';

export default class EventDisplay extends Component {
  @tracked eventsList = emberArray([]);
  @tracked sound;
  @tracked soundProxy;
  @tracked service;
  @service stereo;

  constructor() {
    super(...arguments);
    this.loadSoundFromUrl.perform().catch(e => {
      if (!didCancel(e)) {
        throw (e);
      }
    })
  }

  @task({ debug: true })
  * loadSoundFromUrl() {
    if (this.args.url) {
      this.soundProxy = this.stereo.soundProxy(this.args.url)
      yield this.soundProxy.waitForLoad.perform();
      this.sound = this.soundProxy.value
      this.addSoundEvents(this.sound);
    } else {
      this.service = this.stereo;
      this.addServiceEvents(this.stereo);
    }
  }

  get eventListGroupings() {
    let groupedEvents = [];

    this.eventsList.forEach((e) => {
      let lastItem = groupedEvents.pop();
      if (lastItem && lastItem.name == e.name) {
        set(lastItem, 'count', lastItem.count + 1); // eslint-disable-line
        groupedEvents.push(lastItem);
      } else {
        if (lastItem) {
          groupedEvents.push(lastItem);
        }
        set(e, 'count', 1) // eslint-disable-line
        groupedEvents.push(e);
      }
    });

    return groupedEvents.reverse().slice(0, 15);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.service) {
      this.removeEvents(this.service);
    }
    if (this.sound) {
      this.removeEvents(this.sound);
    }
  }

  addSoundEvents(item) {
    if (!item) { return }

    EVENT_MAP.forEach((e) => {
      item.on(e.event, (data) => {
        this.eventsList.pushObject({
          name: e.event,
          data: data,
          type: "sound",
        });
      });
    });
  }

  addServiceEvents(service) {
    if (!service) { return }

    this.addSoundEvents(service);

    SERVICE_EVENT_MAP.forEach((e) => {
      service.on(e.event, (data) => {
        this.eventsList.pushObject({
          name: e.event,
          data: data,
          type: "service",
        });
      });
    });
  }

  removeEvents(/* item */) { }

  @action
  async displayEvent(e) {
    console.log(`$E = name: ${e.name}`); //eslint-disable-line
    console.log(e.data); //eslint-disable-line
    window.$E = e.data
  }
}
