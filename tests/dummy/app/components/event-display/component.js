import Component from "@glimmer/component";
import { EVENT_MAP, SERVICE_EVENT_MAP } from "ember-hifi/services/hifi";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { A as emberArray } from "@ember/array";
import { set } from "@ember/object";

export default class EventDisplay extends Component {
  @tracked eventsList = emberArray([]);

  constructor() {
    super(...arguments);

    if (this.args.service) {
      this.addServiceEvents(this.args.service);
    } else if (this.args.sound) {
      this.addSoundEvents(this.args.sound);
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

    return groupedEvents.reverse().slice(0, 20);
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

  addServiceEvents(item) {
    this.addSoundEvents(item);

    SERVICE_EVENT_MAP.forEach((e) => {
      item.on(e.event, (data) => {
        this.eventsList.pushObject({
          name: e.event,
          data: data,
          type: "service",
        });
      });
    });
  }

  removeEvents(/* item */) {}

  @action
  async displayEvent(e) {
    console.log(`name: ${e.name}`); //eslint-disable-line
    console.log(e.data); //eslint-disable-line
  }
}
