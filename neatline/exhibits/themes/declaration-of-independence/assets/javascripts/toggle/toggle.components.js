
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.Widget = React.createClass({

    /**
     * Render the top-level markup.
     */
    render: function() {

      // When no signer is selected, show the exhibit-wide spinner.
      if (this.state.signers.length === 0) {
        return (
          <Declaration
            model={this.state.model}
          />
        )
      }

      // If 1 signer is selected, show the spinner for that signer.
      else if (this.state.signers.length === 1) {
        return (
          <Signer
            signer={this.state.signers[0]}
            model={this.state.model}
          />
        )
      }

      // If multiple signers are resolved, show a list of names.
      else if (this.state.signers.length > 1) {
        return (
          <Hometown
            signers={this.state.signers}
          />
        )
      }

    },

    /**
     * By default, no signers selected.
     */
    getInitialState: function() {
      return {
        signers: [],
        selected: false,
        model: null
      };
    },

    /**
     * Highlight a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The highlighted record.
     */
    highlight: function(signers, model) {

      // Flip off a generic selection.
      if (this.genericTargetIsSelected() && !_.isEmpty(signers)) {
        this.unselect();
      }

      // Highlight if no selection.
      if (!this.state.selected) {
        this.setState({
          signers: signers,
          model: model
        });
      }

    },

    /**
     * Unhighlight the current signer(s).
     */
    unhighlight: function(signers, model) {
      if (!this.state.selected) {
        this.replaceState(this.getInitialState());
      }
    },

    /**
     * Select a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The selected record.
     */
    select: function(signers, model) {
      this.setState({
        selected: true,
        signers: signers,
        model: model
      });
    },

    /**
     * Unselect the current signer(s).
     */
    unselect: function(signers, model) {
      this.replaceState(this.getInitialState());
    },

    /**
     * If the currently-selected model is one of the generic, exhibit-wide
     * text/painting/map targets, unselect it.
     */
    unselectGenericTarget: function(signers, model) {
      if (this.genericTargetIsSelected()) {
        this.unselect();
      }
    },

    /**
     * Is an exhibit-generic target currently selected?
     *
     * @return {Boolean}
     */
    genericTargetIsSelected: function() {

      var isGeneric = false;

      if (this.state.model) {

        var slug = this.state.model.get('slug');

        // Is the model an exhibit-generic target?
        if (_.contains(['text', 'painting', 'map'], slug)) {
          isGeneric = true;
        }

      }

      return isGeneric;

    }

  });


  var Declaration = React.createClass({

    /**
     * When no signer is highlighted/selected.
     */
    render: function() {
      return (
        <ul className="toggle">

          <li className="current">
            <span>The Declaration of Independence</span>
          </li>

          <TargetButton
            text="Text"
            icon="list-alt"
            slug="text"
            model={this.props.model}
          />

          <TargetButton
            text="Painting"
            icon="user"
            slug="painting"
            model={this.props.model}
          />

          <TargetButton
            text="Map"
            icon="globe"
            slug="map"
            model={this.props.model}
          />

          <li className="toggle" onClick={this.toggle}>
            <span className="glyphicon glyphicon-refresh" />
          </li>

        </ul>
      );
    },

    /**
     * Toggle through the targets.
     */
    toggle: function() {

      var next;

      // Get the slug for the next record.
      if (this.props.model) {

        var order = ['text', 'painting', 'map'];
        var slug = this.props.model.get('slug');
        var index = _.indexOf(order, slug);

        if (index < (order.length-1)) next = order[index+1]
        else next = order[0];

      } else {
        next = 'text';
      }

      // Get the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: next
      });

      // Publish the event.
      Neatline.vent.trigger('select', {
        model: record, source: 'TOGGLE'
      });

    }

  });


  var Signer = React.createClass({

    /**
     * When one signer is highlighted/selected.
     */
    render: function() {
      return (
        <ul className="toggle">

          <li className="current">
            <span>{this.props.signer.name}</span>
          </li>

          <TargetButton
            text="Text"
            icon="list-alt"
            slug={this.props.signer.records.text}
            model={this.props.model}
          />

          <TargetButton
            text="Painting"
            icon="user"
            slug={this.props.signer.records.painting}
            model={this.props.model}
          />

          <TargetButton
            text="Map"
            icon="globe"
            toggleSlug={this.props.signer.records.text}
            slug={this.props.signer.records.map}
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
        toggleSlug: this.props.signer.records.text,
        source: 'TOGGLE'
      });

    }

  });


  var Hometown = React.createClass({

    /**
     * When one hometown points to multiple signers.
     */
    render: function() {

      var signers = _.map(this.props.signers, function(signer) {
        return (<ResidentButton signer={signer} />);
      });

      return (
        <ul className="signers">
          {signers}
        </ul>
      );

    }

  });


  var TargetButton = React.createClass({

    /**
     * A text/painting/map toggle button.
     */
    render: function() {

      // Classes on the container <li>.
      var itemClasses = {
        disabled: !this.props.slug,
        target: true
      };

      // Is the button currently selected?
      if (this.props.model) {
        var slug = this.props.model.get('slug');
        itemClasses['selected'] = (slug == this.props.slug)
      }

      // Glyphicon classes.
      var iconClasses = {
        glyphicon: true
      };

      // Construct the icon name.
      iconClasses['glyphicon-'+this.props.icon] = true;

      // Convert to class strings.
      var itemCx = React.addons.classSet(itemClasses);
      var iconCx = React.addons.classSet(iconClasses);

      return (
        <li className={itemCx} onClick={this.select}>
          <span className={iconCx} />
          <span className="name">{this.props.text}</span>
        </li>
      );

    },

    /**
     * By default, no origin slug.
     */
    getDefaultProps: function() {
      return {
        toggleSlug: null
      };
    },

    /**
     * Select the target.
     */
    select: function() {
      if (this.props.slug) {
        this.publish('select', this.props.slug);
      }
    },

    /**
     * Publish an event with the model, identified by slug.
     */
    publish: function(event, slug) {

      // Pop the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: slug
      });

      // Publish the event.
      Neatline.vent.trigger(event, {
        model: record,
        toggleSlug: this.props.toggleSlug,
        source: 'TOGGLE'
      });

    }

  });


  var ResidentButton = React.createClass({

    /**
     * A text/painting/map toggle button.
     */
    render: function() {
      return (
        <li className="signer" onClick={this.select}>
          <span>{this.props.signer.name}</span>
        </li>
      );
    },

    /**
     * Select the target.
     */
    select: function() {
      this.publish('select', this.props.signer.records.map);
    },

    /**
     * Publish an event with the model, identified by slug.
     */
    publish: function(event, slug) {

      // Get the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: slug
      });

      // Publish the event.
      Neatline.vent.trigger(event, {
        model: record,
        toggleSlug: this.props.signer.records.text,
        source: 'TOGGLE'
      });

    }

  });


});
