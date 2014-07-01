
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle.Components', function(Components) {


  Components.Signer = React.createClass({


    mixins: [ReactBootstrap.OverlayMixin],


    /**
     * When one signer is highlighted/selected.
     */
    render: function() {

      // Alias <TargetButton />.
      var TargetButton = Components.TargetButton;

      // By default, just the signer's name.
      var name = this.props.signer.name;

      // If we're focused on a location, show the location name too.
      if (this.props.model.hasTag('hometown')) {
        name = this.props.model.get('title') + ' ~ ' + name;
      }

      // Construct the class string.
      var signerCx = React.addons.classSet({
        toggle: true,
        confederate: this.props.model.hasTag('confederate'),
        union: this.props.model.hasTag('union')
      });

      return (
        <ul className={signerCx}>

          <li className="current" onClick={this.showBio}>
            <span>{name}</span>
          </li>

          <TargetButton
            text="Text"
            icon="list-alt"
            slug={this.props.signer.records.text}
            selected={this.props.selected}
            model={this.props.model}
          />

          <TargetButton
            text="Painting"
            icon="user"
            slug={this.props.signer.records.painting}
            selected={this.props.selected}
            model={this.props.model}
          />

          <TargetButton
            text="Map"
            icon="globe"
            signerSlug={this.props.signer.records.text}
            slug={this.props.signer.records.map}
            selected={this.props.selected}
            model={this.props.model}
          />

          <li className="toggle" onClick={this.toggle}>
            <span className="glyphicon glyphicon-refresh" />
          </li>

        </ul>
      );

    },


    /**
     * Set the slug order array for the `toggle` method.
     */
    componentWillMount: function() {

      var self = this;
      var order = ['text', 'painting', 'map'];
      var slugs = [];

      // Build out an ordered list of target slugs.
      _.each(order, function(key) {
        var slug = self.props.signer.records[key];
        if (slug) slugs.push(slug);
      });

      this.setState({ order: slugs });

    },


    /**
     * By default, hide the biography modal.
     */
    getInitialState: function() {
      return {
        bioIsOpen: false
      };
    },


    /**
     * Toggle through the targets.
     */
    toggle: function() {

      var order = this.state.order, next;

      // Get the index of the current slug.
      var slug = this.props.model.get('slug');
      var index = _.indexOf(order, slug);

      // Get the slug for the next record.
      if (index < (order.length-1)) next = order[index+1]
      else next = order[0];

      // Get the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: next
      });

      // Publish the event.
      Neatline.vent.trigger('select', {
        model: record,
        signerSlug: this.props.signer.records.text,
        source: 'TOGGLE'
      });

    },


    /**
     * Trigger the biography modal.
     */
    showBio: function() {
      this.setState({ bioIsOpen: true });
    },


    /**
     * Close the biography modal.
     */
    hideBio: function() {
      this.setState({ bioIsOpen: false });
    },


    /**
     * Render the biography modal.
     */
    renderOverlay: function() {

      // Get a canonical model.
      var model = this.getBioModel();

      // Halt if the bio is hidden.
      if (!this.state.bioIsOpen || !model) {
        return <span />;
      }

      // Load the bio for the signer.
      model.loadItem(_.bind(function(metadata) {
        this.setState({ biography: metadata });
      }, this));

      // Alias <Modal />.
      var Modal = ReactBootstrap.Modal;

      return (
        <Modal
          title={this.props.signer.name}
          onRequestHide={this.hideBio}>

          <div
            className="modal-body"
            dangerouslySetInnerHTML={{__html: this.state.biography}}>
          </div>

        </Modal>
      );

    },


    /**
     * Get a canonical model for the biography modal.
     *
     * @return {Neatline.Shared.Record.Model}
     */
    getBioModel: function() {
      return Neatline.request('MAP:getRecords').findWhere({
        slug: this.props.signer.records.text
      });
    }


  });


});
