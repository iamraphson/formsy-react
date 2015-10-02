var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Formsy = require('./../src/main.js');

describe('Rules: isLength', function() {
  var TestInput, isValid, form, input;

  function pass(value) {
    return pass.length ? function () {
      TestUtils.Simulate.change(input, {target: {value: value}});
      expect(isValid).toBe(true);
    } : function () { expect(isValid).toBe(true); };
  }

  function fail(value) {
    return fail.length ? function () {
      TestUtils.Simulate.change(input, {target: {value: value}});
      expect(isValid).toBe(false);
    } : function () { expect(isValid).toBe(false); };
  }

  beforeEach(function() {
    TestInput = React.createClass({
      mixins: [Formsy.Mixin],
      updateValue: function (event) {
        this.setValue(event.target.value);
      },
      render: function () {
        isValid = this.isValid();
        return <input value={this.getValue()} onChange={this.updateValue}/>
      }
    });
  });

  afterEach(function() {
    TestInput = isValid = form = null;
  });

  describe('isLength:3', function() {

    beforeEach(function() {
      form = TestUtils.renderIntoDocument(
        <Formsy.Form>
          <TestInput name="foo" validations="isLength:3"/>
        </Formsy.Form>
      );

      input = TestUtils.findRenderedDOMComponentWithTag(form, 'INPUT');
    });

    it('should pass with a default value', pass());

    it('should fail with a string too small', fail('hi'));

    it('should fail with a string too long', fail('foo bar'));

    it('should pass with the right length', pass('sup'));

    it('should pass with an undefined', pass(undefined));

    it('should pass with a null', pass(null));

    it('should pass with an empty string', pass(''));

    it('should fail with a number', fail(123));

  });

  describe('isLength:0', function() {

    beforeEach(function() {
      form = TestUtils.renderIntoDocument(
        <Formsy.Form>
          <TestInput name="foo" validations="isLength:0"/>
        </Formsy.Form>
      );

      input = TestUtils.findRenderedDOMComponentWithTag(form, 'INPUT');
    });

    it('should pass with a default value', pass());

    it('should fail with a string too long', fail('foo bar'));

    it('should pass with an undefined', pass(undefined));

    it('should pass with a null', pass(null));

    it('should pass with an empty string', pass(''));

    it('should fail with a number', fail(123));

  });

});