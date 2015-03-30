(function ($) {
  module('jQuery#socialJS', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.socialJS(), this.elems, 'should be chainable');
  });

  test('is socialJs', function () {
    expect(1);
    strictEqual(this.elems.socialJS().text(), 'socialJs0socialJs1socialJs2', 'should be socialJs');
  });

}(jQuery));
