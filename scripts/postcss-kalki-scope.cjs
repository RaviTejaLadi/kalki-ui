/**
 * Scopes compiled Kalki CSS so utilities/tokens only apply on `.kalki-ui` nodes.
 * Runs after `@tailwindcss/postcss` so selectors are already expanded.
 */

const SCOPE = 'kalki-ui';
const SCOPE_SEL = `.${SCOPE}`;
const WHERE_SCOPE = `:where(${SCOPE_SEL})`;

function scopeSelector(selector) {
  const trimmed = selector.trim();
  if (!trimmed) return trimmed;

  if (trimmed.includes(SCOPE_SEL) || trimmed.includes(WHERE_SCOPE)) {
    return trimmed;
  }

  if (/^:root(\s*,\s*:host)?$/.test(trimmed) || trimmed === ':host') {
    return SCOPE_SEL;
  }

  // Tailwind v4 @layer properties init: *,:before,:after / ::backdrop
  if (trimmed === '*') {
    return `${SCOPE_SEL}, ${SCOPE_SEL} *`;
  }
  if (trimmed === '::backdrop') {
    return `${SCOPE_SEL}::backdrop, ${SCOPE_SEL} ::backdrop`;
  }
  if (/^(\*|::before|:before|::after|:after)(\s*,\s*(\*|::before|:before|::after|:after))*$/.test(trimmed)) {
    return trimmed
      .split(',')
      .map((part) => {
        const p = part.trim();
        if (p === '*') return `${SCOPE_SEL}, ${SCOPE_SEL} *`;
        if (p === ':before' || p === '::before') {
          return `${SCOPE_SEL}:before, ${SCOPE_SEL} *:before`;
        }
        if (p === ':after' || p === '::after') {
          return `${SCOPE_SEL}:after, ${SCOPE_SEL} *:after`;
        }
        return `${SCOPE_SEL} ${p}, ${SCOPE_SEL}${p}`;
      })
      .join(', ');
  }

  // Utility / custom class rules — compound + descendant so:
  // 1) nodes with both `kalki-ui` and the utility match
  // 2) nested raw className strings inside a scoped parent still match
  // 3) host-app elements outside `.kalki-ui` are untouched
  if (trimmed.startsWith('.')) {
    return `${WHERE_SCOPE}${trimmed}, ${WHERE_SCOPE} ${trimmed}`;
  }

  // Rare non-class selectors from plugins — require an ancestor scope.
  if (trimmed.startsWith(':') && !trimmed.startsWith(':root')) {
    return `${WHERE_SCOPE}${trimmed}, ${WHERE_SCOPE} ${trimmed}`;
  }

  return `${WHERE_SCOPE} ${trimmed}`;
}

function scopeRuleSelector(selector) {
  return selector
    .split(',')
    .map((part) => scopeSelector(part))
    .join(', ');
}

const plugin = () => ({
  postcssPlugin: 'kalki-scope',
  OnceExit(root) {
    root.walkRules((rule) => {
      const parent = rule.parent;
      if (parent?.type === 'atrule') {
        const name = parent.name;
        if (name === 'keyframes' || name === 'property' || name === 'font-face') {
          return;
        }
      }

      if (!rule.selector || rule.selector.includes('keyframes')) {
        return;
      }

      rule.selector = scopeRuleSelector(rule.selector);
    });
  },
});

plugin.postcss = true;

module.exports = plugin;
