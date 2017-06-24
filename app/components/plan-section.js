import Ember from 'ember';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ComponentTransitionsMixin, {
  tagName: 'section',
  classNames: ['plan'],

  didReceiveAttrs() {
  	Ember.run.next(() => {
    	if (this.get('plan')) {
    		this.set('loaded', true);
    	}
    });
  },

  rsvpPrefix: Ember.computed('plan.rsvp', function() {
  	if (this.get('plan.rsvp') === 'yes') {
  		return 'I plan to attend';
  	} else if (this.get('plan.rsvp') === 'no') {
  		return 'I don\'t plan to attend';
  	} else if (this.get('plan.rsvp') === 'maybe') {
  		return 'I might attend';
  	} else if (this.get('plan.rsvp') === 'interested') {
  		return 'I\'m interested in attending';
  	}
  })
});