/**
 * Takes any 11ty shortcode that takes an argument and converts
 * it into a NJK extension.
 *
 * @param {string} name The name of the extension/shortcode
 * @param {(...args: any[]) => any} func The code to execute
 * @returns {import('nunjucks').Extension} A NJK extension
 */
module.exports = function createNJKExtension(name, func) {
  /** @type {import('nunjucks').Extension} */
  class Extension {
    constructor() {
      this.tags = [name];
    }

    parse(parser, nodes) {
      const tok = parser.nextToken();
      const args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      return new nodes.CallExtension(this, 'run', args, null);
    }

    run(_, data = {}) {
      return func(data);
    }
  }

  return new Extension();
};
