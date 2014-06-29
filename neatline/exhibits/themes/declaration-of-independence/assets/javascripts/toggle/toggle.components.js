
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
            model={this.state.model} />
        )
      }

      // If 1 signer is selected, show the spinner for that signer.
      else if (this.state.signers.length === 1) {
        return (
          <Signer
            signer={this.state.signers[0]}
            model={this.state.model} />
        )
      }

      // If multiple signers are resolved, show a list of names.
      else if (this.state.signers.length > 1) {
        return (
          <Hometown
            signers={this.state.signers} />
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
            slug="text" />

          <TargetButton
            text="Painting"
            icon="user"
            slug="painting" />

          <TargetButton
            text="Map"
            icon="globe"
            slug="map" />

          <ToggleButton />

        </ul>
      );
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
            slug={this.props.signer.records.text} />

          <TargetButton
            text="Painting"
            icon="user"
            slug={this.props.signer.records.painting} />

          <TargetButton
            text="Map"
            icon="globe"
            toggleSlug={this.props.signer.records.text}
            slug={this.props.signer.records.map} />

          <ToggleButton />

        </ul>
      );
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

      var cx = { glyphicon: true };
      cx['glyphicon-'+this.props.icon] = true;

      return (
        <li className="target" onClick={this.select}>
          <span className={React.addons.classSet(cx)} />
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
      this.publish('select', this.props.slug);
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


  var ToggleButton = React.createClass({

    /**
     * A toggle button.
     */
    render: function() {
      return (
        <li className="toggle">
          <span className="glyphicon glyphicon-refresh" />
        </li>
      );
    }

  });


});
